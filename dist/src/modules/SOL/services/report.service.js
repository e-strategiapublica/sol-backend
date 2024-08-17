"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ReportService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const contract_repository_1 = require("../repositories/contract.repository");
const report_contract_response_dto_1 = require("../dtos/report-contract.response.dto");
const bid_repository_1 = require("../repositories/bid.repository");
const bid_status_enum_1 = require("../enums/bid-status.enum");
const user_repository_1 = require("../repositories/user.repository");
const report_repository_1 = require("../repositories/report.repository");
const file_repository_1 = require("../repositories/file.repository");
const ExcelJS = require('exceljs');
const axios = require('axios');
const fs_1 = require("fs");
const supplier_repository_1 = require("../repositories/supplier.repository");
const agreement_repository_1 = require("../repositories/agreement.repository");
let ReportService = ReportService_1 = class ReportService {
    constructor(_contractRepository, _bidRepository, _userRepository, _reportRepository, _fileRepository, _supplierRepository, _agreementRepository) {
        this._contractRepository = _contractRepository;
        this._bidRepository = _bidRepository;
        this._userRepository = _userRepository;
        this._reportRepository = _reportRepository;
        this._fileRepository = _fileRepository;
        this._supplierRepository = _supplierRepository;
        this._agreementRepository = _agreementRepository;
        this._logger = new common_1.Logger(ReportService_1.name);
        this.csvOptions = {
            header: true,
            delimiter: ',',
        };
    }
    async getDataContract() {
        const listAll = await this._contractRepository.list();
        let contractList = listAll.filter(el => el.bid_number.status === bid_status_enum_1.BidStatusEnum['completed']);
        let response = {
            assetsChart: 0,
            servicesChart: 0,
            constructionChart: 0,
            qtdBid: 0,
            estimatedTotalValueOfBids: 0,
            qtdAssets: 0,
            qtdServices: 0,
            qtdconstruction: 0,
            valueAssets: 0,
            valueServices: 0,
            valueconstruction: 0,
        };
        let assets = [];
        let construction = [];
        let services = [];
        for (let iterator of contractList) {
            if (iterator.bid_number.classification === 'De Bens') {
                assets.push(iterator);
                response.valueAssets += Number(iterator.value);
            }
            if (iterator.bid_number.classification === 'De Obras') {
                construction.push(iterator);
                response.valueconstruction += Number(iterator.value);
            }
            if (iterator.bid_number.classification === 'De Serviço') {
                services.push(iterator);
                response.valueServices += Number(iterator.value);
            }
        }
        let bid = {
            value: 0
        };
        for (let iterator of contractList) {
            bid.value += Number(iterator.value);
        }
        return new report_contract_response_dto_1.ReportContractResponseDto(assets.length, services.length, construction.length, contractList.length, bid.value, assets.length, services.length, construction.length, response.valueAssets, response.valueServices, response.valueconstruction);
    }
    async getSpreadsheet(type, generatedById) {
        const user = await this._userRepository.getById(generatedById);
        if (type === 'bidData') {
            const listBid = await this._bidRepository.list();
            let responseBid = [];
            for (let iterator of listBid) {
                const statusPT = {
                    awaiting: 'Aguardando Liberação',
                    deserted: 'Deserta',
                    draft: 'Em Rascunho',
                    analysis: 'Em Análise',
                    released: 'Lançada',
                    open: 'Aberta',
                    completed: 'Concluída',
                    reopened: 'Reaberta',
                    failed: 'Falhou',
                    canceled: 'Cancelada',
                    tiebreaker: 'Aguardando Desempate',
                    returned: 'Devolvida'
                };
                responseBid.push({ bidCount: iterator.bid_count + '/' + iterator.createdAt.getFullYear(), classification: iterator.classification, start_at: iterator.start_at, end_at: iterator.end_at, status: statusPT[iterator.status] });
            }
            const columnNames = ['Bid', 'Classificação', 'Data de inicio', 'Data de termino', 'status'];
            const spreadsheetName = 'Relatório de execução de acordo com período de execução';
            let requestReportGenerate = {
                situation: 'Gerado',
                archive: null,
                generatedBy: user,
                name: 'Relatorio de licitação'
            };
            const file = await this.generateExcel(responseBid, columnNames, spreadsheetName);
            const base64 = await this.convertBlobToBase64(file);
            requestReportGenerate.archive = this._fileRepository.upload(`report_${new Date().getTime()}.xlsx`, base64);
            await this._reportRepository.register(requestReportGenerate);
            return file;
        }
        if (type === 'supplierBid') {
            const bidList = await this._bidRepository.list();
            const result = await this.findRepeatedIds(bidList);
            const columnNames = ['Fornecedor', 'Tipo', 'Data de cadastro', 'Licitações presentes'];
            const spreadsheetName = 'Relatório de fornecedores que mais participam de licitações';
            let responseBid = [];
            for (let iterator of result) {
                responseBid.push({ name: iterator.id.name, type: iterator.id.type, createdAt: iterator.id.createdAt, repeat: iterator.count });
            }
            let requestReportGenerate = {
                situation: 'Gerado',
                archive: null,
                generatedBy: user,
                name: 'Relatório de fornecedores e licitações'
            };
            const file = await this.generateExcel(responseBid, columnNames, spreadsheetName);
            const base64 = await this.convertBlobToBase64(file);
            requestReportGenerate.archive = this._fileRepository.upload(`report_${new Date().getTime()}.xlsx`, base64);
            await this._reportRepository.register(requestReportGenerate);
            return file;
        }
        if (type === 'supplierContract') {
            const contractList = await this._contractRepository.list();
            const result = await this.findSupplierIdRepetitions(contractList);
            let responseBid = [];
            for (let iterator of result) {
                let quantity = 0;
                const supplier = await this._supplierRepository.listById(iterator.supplierId);
                quantity = iterator.documents.reduce((acc, item) => acc + Number(item.value), 0) + quantity;
                responseBid.push({ name: supplier.name, type: supplier.type, repeat: iterator.count, value: quantity });
            }
            let requestReportGenerate = {
                situation: 'Gerado',
                archive: null,
                generatedBy: user,
                name: 'Relatório de fornecedores e contratos'
            };
            const columnNames = ['Fornecedor', 'Tipo', 'Repetições', 'Valor acumulado de contratos'];
            const spreadsheetName = 'Relatório de fornecedores com maior numero e valores de contratos';
            const file = await this.generateExcel(responseBid, columnNames, spreadsheetName);
            const base64 = await this.convertBlobToBase64(file);
            requestReportGenerate.archive = this._fileRepository.upload(`report_${new Date().getTime()}.xlsx`, base64);
            await this._reportRepository.register(requestReportGenerate);
            return file;
        }
        if (type === 'itemsData') {
            const agreementList = await this._agreementRepository.findAll();
            let responseBid = [];
            for (let iterator of agreementList) {
                let statusPt = {
                    canceled: "cancelado",
                    concluded: "concluido",
                    inExecution: "em execução",
                };
                let quantity = 0;
                responseBid.push({ convenio: iterator.register_number, status: statusPt[iterator.status], value: iterator.value, association: iterator.association.name });
            }
            let requestReportGenerate = {
                situation: 'Gerado',
                archive: null,
                generatedBy: user,
                name: 'Relatório de itens semelhantes'
            };
            const columnNames = ['Convenio', 'Status', 'Valor', 'Associação'];
            const spreadsheetName = 'Relatório da variação do valor dos itens de custo';
            const file = await this.generateExcel(responseBid, columnNames, spreadsheetName);
            const base64 = await this.convertBlobToBase64(file);
            requestReportGenerate.archive = this._fileRepository.upload(`report_${new Date().getTime()}.xlsx`, base64);
            await this._reportRepository.register(requestReportGenerate);
            return file;
        }
        return;
    }
    async findRepeatedIds(objects) {
        const repeatedIdsMap = new Map();
        for (const obj of objects) {
            if (obj.invited_suppliers && obj.invited_suppliers.length > 0) {
                for (const id of obj.invited_suppliers) {
                    if (repeatedIdsMap.has(id)) {
                        repeatedIdsMap.set(id, repeatedIdsMap.get(id) + 1);
                    }
                    else {
                        repeatedIdsMap.set(id, 1);
                    }
                }
            }
        }
        const repeatedIds = [];
        for (const [id, count] of repeatedIdsMap.entries()) {
            if (count > 1) {
                repeatedIds.push({ id, count });
            }
        }
        return repeatedIds;
    }
    async findSupplierIdRepetitions(objects) {
        const supplierInfoMap = new Map();
        for (const obj of objects) {
            if (obj.supplier_id !== null) {
                const supplierId = obj.supplier_id._id.toString();
                if (supplierInfoMap.has(supplierId)) {
                    const supplierInfo = supplierInfoMap.get(supplierId);
                    supplierInfo.count++;
                    supplierInfo.documents.push(obj);
                }
                else {
                    const supplierInfo = {
                        supplierId,
                        count: 1,
                        documents: [obj],
                    };
                    supplierInfoMap.set(supplierId, supplierInfo);
                }
            }
        }
        const supplierInfos = [];
        for (const supplierInfo of supplierInfoMap.values()) {
            supplierInfos.push(supplierInfo);
        }
        return supplierInfos;
    }
    async generateExcel(jsonData, columnNames, spreadsheetName) {
        return new Promise((resolve, reject) => {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Dados');
            axios.get('https://images.squarespace-cdn.com/content/v1/5cd5c404e5f7d13cfa2ac0fa/1558718892465-RJ2ZL3SW2CKIN5IRKWBD/sol-logo-_logo.png?format=1500w', { responseType: 'arraybuffer' })
                .then(async (response) => {
                const imageId = workbook.addImage({
                    buffer: response.data,
                    extension: 'png',
                });
                worksheet.addImage(imageId, {
                    tl: { col: 0, row: 0 },
                    ext: { width: 75, height: 75 },
                    editAs: 'oneCell',
                });
                const titleCell = worksheet.getCell('C2');
                titleCell.value = 'Solução Online de Licitação';
                titleCell.font = {
                    bold: true,
                    size: 24,
                    color: { argb: 'FF2C576D' },
                };
                worksheet.mergeCells('C2:H2');
                worksheet.addRow([]);
                worksheet.addRow([]);
                worksheet.addRow([]);
                worksheet.addRow([]);
                worksheet.getCell('B7').value = spreadsheetName;
                worksheet.addRow([]);
                worksheet.addRow(columnNames);
                jsonData.forEach((data) => {
                    worksheet.addRow(Object.values(data));
                });
                const filePath = 'report.xlsx';
                workbook.xlsx.writeFile(filePath)
                    .then(async () => {
                    resolve(filePath);
                })
                    .catch((err) => {
                    reject(err);
                });
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    async getReportGenerated() {
        return await this._reportRepository.list();
    }
    async convertBlobToBase64(filePath) {
        const buffer = (0, fs_1.readFileSync)(filePath);
        const base64String = buffer.toString('base64');
        return base64String;
    }
    async downloadReportGeneratedById(_id) {
        const result = await this._reportRepository.getById(_id);
        if (!result) {
            throw new common_1.BadRequestException('Arquivo nao encontrado!');
        }
        return this._fileRepository.download(result.archive);
    }
};
ReportService = ReportService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contract_repository_1.ContractRepository,
        bid_repository_1.BidRepository,
        user_repository_1.UserRepository,
        report_repository_1.ReportRepository,
        file_repository_1.FileRepository,
        supplier_repository_1.SupplierRepository,
        agreement_repository_1.AgreementRepository])
], ReportService);
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map
import { LanguageContractEnum } from "src/modules/SOL/enums/language-contract.enum";

export const ErrorMessages = {
  MODEL_NOT_FOUND: {
    [LanguageContractEnum.portuguese]: "Modelo de documento não encontrado",
    [LanguageContractEnum.english]: "Document template not found",
    [LanguageContractEnum.spanish]: "Plantilla de documento no encontrada",
    [LanguageContractEnum.french]: "Modèle de document non trouvé",
  },
  FILE_NOT_CREATED_OR_MISSING: {
    [LanguageContractEnum.portuguese]:
      "Arquivo do modelo não foi criado ou está ausente",
    [LanguageContractEnum.english]:
      "Model file has not been created or is missing",
    [LanguageContractEnum.spanish]:
      "El archivo del modelo no ha sido creado o falta",
    [LanguageContractEnum.french]:
      "Le fichier modèle n'a pas été créé ou est manquant",
  },
  FILE_CONVERSION_ERROR: {
    [LanguageContractEnum.portuguese]:
      "Erro ao converter o arquivo, verifique se o python está instalado e se o caminho está correto",
    [LanguageContractEnum.english]:
      "Error converting file. Make sure Python is installed and the path is correct",
    [LanguageContractEnum.spanish]:
      "Error al convertir el archivo. Asegúrese de que Python esté instalado y la ruta sea correcta",
    [LanguageContractEnum.french]:
      "Erreur de conversion du fichier. Vérifiez que Python est installé et que le chemin est correct",
  },
};

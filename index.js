const fs = require('fs-extra');
const handlebars = require('handlebars');
let configData = require(`./config.json`);

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateConfig(templatePath, outputPath, data) {
    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateContent);
    const outputContent = compiledTemplate(data);

    fs.writeFileSync(outputPath, outputContent, 'utf-8');
}

const templateConfigs = [
    { templatePath: './template/template.controller.hbs', outputPath: `./outputDir/${configData.entityName}/${configData.entityName}.controller.ts` },
    { templatePath: './template/template.module.hbs', outputPath: `./outputDir/${configData.entityName}/${configData.entityName}.module.ts` },
    { templatePath: './template/template.repository.hbs', outputPath: `./outputDir/${configData.entityName}/${configData.entityName}.repository.ts` },
    { templatePath: './template/template.service.hbs', outputPath: `./outputDir/${configData.entityName}/${configData.entityName}.service.ts` },
    { templatePath: './template/template.dto.hbs', outputPath: `./outputDir/${configData.entityName}/dto/${configData.entityName}-dto.dto.ts` },
];

const templateFolderConfigs = [
    `./outputDir/${configData.entityName}`,
    `./outputDir/${configData.entityName}/dto`
];

// ===> Format data config
configData = {
    ...configData,
    entityName_capital: capitalizeFirstLetter(configData.entityName)
}

// ===> Generate
// create folder
templateFolderConfigs.forEach((folderName) => {
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
        console.log(`Folder '${folderName}' created successfully.`);
    } else {
        console.log(`Folder '${folderName}' already exists.`);
    }
});

templateConfigs.forEach(({ templatePath, outputPath }) => {
    generateConfig(templatePath, outputPath, configData);
});

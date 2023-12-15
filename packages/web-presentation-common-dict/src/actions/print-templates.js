const getPrintTemplatesList = ({RestClient}) => {
    return RestClient
        .get(`/dictionaries/print-templates`)
        .then(response => response.body)
};

const GetPrintTemplate = ({RestClient}, type) => {
    return RestClient
        .get(`/dictionaries/print-templates/${type}`)
        .then(response => response.body)
};

const CreatePrintTemplate = ({RestClient}, data) => {
    let request = RestClient
        .post(`/dictionaries/print-templates/${data.type}`)
        .query({
            name: data.name,
            formId: data.formId,
            copiesNumber: data.copiesNumber
        });
    if (data.content) {
        request = request.attach('content', data.content)
    }
    return request.then(response => response.body)
};

export const GetPrintTemplatesListAction = {
    name: 'dict.print-templates.get',
    action: getPrintTemplatesList
};


export const SavePrintTemplateAction = {
    name: 'dict.print-templates.create',
    action: CreatePrintTemplate
};

export const GetPrintTemplateAction = {
    name: 'dict.print-template.get',
    action: GetPrintTemplate
};

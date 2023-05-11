import swaggerJsDoc from 'swagger-jsdoc'
export const options:swaggerJsDoc.Options = {
    definition :{
        openapi:"3.0.0",
        info: {
            title:"T-Politik API",
            version: "1.0.0",
            describe:"Es una api para el senso de votos de una campaña politica"
        },
        servers:[
            {
                url:"http://localhost:3001"
            }
        ]
    },
    apis:["./src/routes/*/*.doc.ts"]
}
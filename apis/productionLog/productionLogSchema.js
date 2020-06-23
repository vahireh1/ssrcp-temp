module.exports.productionLogSchema = { 
                               productionLogId : {
                                    type: Number,
                                    unique: true,
                                    required: true,
                                    index: true
                               },
                               tileModelId: {
                                    type: Number,
                                    required: true
                                },
                                comments: {
                                    type: String,
                                    required: true
                                },
                                quantity: {
                                    type: Number,
                                    required: true
                                },
                                productionDate: {
                                    type: Number,
                                    required: true                                   
                                },
                                dateCreated: {
                                    type: Number,
                                    required: true                                   
                                },
                                createdBy: {
                                    type: Number,
                                    required: true                                
                                },
                                dateUpdated: {
                                    type: Number
                                },
                                updatedBy: {
                                    type: Number
                                }
};
module.exports.tileModelSchema = { 
                               tileModelId: {
                                    type: Number,
                                    unique: true,
                                    required: true,
                                    index: true
                                },
                                tileModelName: { 
                                    type: String,
                                    index: true,
                                    required: true,
                                    unique: true
                                },
                                color: { 
                                    type: String,
                                    index: true,
                                    required: true
                                },
                                modelNumber: { 
                                    type: String
                                },
                                modelImage: { 
                                    type: String
                                },
                                quantity: {
                                    type: Number,
                                    required: true
                                },
                                tileModels: {
                                    type: Boolean,
                                    required: true,
                                    default: false
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
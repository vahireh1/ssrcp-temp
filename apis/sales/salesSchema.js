module.exports.salesSchema = { 
                               salesLogId: {
                                    type: Number,
                                    unique: true,
                                    required: true,
                                    index: true
                                },
                                items: { 
                                    type: Array,
                                    required: true
                                },
                                totalQuantity: {
                                    type: Number,
                                     required: true
                                },
                                comments: {
                                    type: String
                                },
                                customerName: {
                                    type: String,
                                    required: true,
                                    index: true
                                },
                                customerNumber: {
                                    type: Number,
                                    required: true,
                                    index: true
                                },
                                dateCreated: {
                                    type: Number,
                                    // required: true
                                },
                                createdBy: {
                                    type: Number,
                                    // required: true
                                },
                                dateUpdated: {
                                    type: Number
                                },
                                updatedBy: {
                                    type: Number
                                }
};
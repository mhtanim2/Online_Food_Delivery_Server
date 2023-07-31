const dataSchema = new Schema({
    orderId: { type: Schema.Types.ObjectId, ref: 'order', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
    quantity: { type: Number, required: true },
});

const OrderItem = mongoose.model('orderItem', dataSchema);
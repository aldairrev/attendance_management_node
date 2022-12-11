exports.toJson = () => {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
};

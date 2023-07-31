const customerAddLocationSrvice = async (req, DataModel) => {
    const { id } = req.headers;
    const location = req.body;
    try {
        const NewLocation = new DataModel({
            ...location,
            userId: id,
        });
    const result = await NewLocation.save();

    return { data: result, message: 'Location was added successfully.' };
  } catch (error) {
    return { message: 'Unknown error occured!', error: error.toString() };
  }
};

module.exports = customerAddLocationSrvice;

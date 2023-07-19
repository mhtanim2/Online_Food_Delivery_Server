const UpdateService= async (Request,DataModel) => {
    try{
        let id=Request.params.id;
        let PostBody=Request.body;
        let data = await DataModel.updateOne({_id:id},PostBody);
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=UpdateService


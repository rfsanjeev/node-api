const addData = async (schema, data) => {
  const modelData = new schema(data);
  await modelData.save();
};

const updateData = async (schema, id, data) => {
  return await schema.findByIdAndUpdate(id, data);
};

const deleteData = async (schema, id) => {
  return await schema.findByIdAndDelete(id);
};

const getDataById = async (schema, id) => {
  return await schema.findById(id, {title: 1,description: 1,location: 1,date: 1,_id: 0,id: "$_id"});
};
    
const getData = async (schema, id) => {
  return await schema.find({ user_id: id },
    { title: 1, description: 1, location: 1, date: 1, _id: 0, id: "$_id" }
  );
};

export { addData, updateData, deleteData, getDataById, getData };

import * as Yup from 'yup';

const schema = Yup.object().shape({
  title: Yup.string().required(),
  file_id: Yup.number().required(),
  description: Yup.string().required(),
  location: Yup.string().required(),
  date: Yup.date().required(),
});

export default schema;

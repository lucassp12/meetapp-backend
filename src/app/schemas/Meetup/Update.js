import * as Yup from 'yup';

const schema = Yup.object().shape({
  title: Yup.string(),
  file_id: Yup.number(),
  description: Yup.string(),
  location: Yup.string(),
  date: Yup.date(),
});

export default schema;

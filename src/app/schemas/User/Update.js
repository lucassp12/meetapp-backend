import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email(),
  old_password: Yup.string().min(6),
  password: Yup.string()
    .min(6)
    .when('old_password', (old_password, field) =>
      old_password ? field.required() : field
    ),
  confirm_password: Yup.string().when('password', (password, field) =>
    password ? field.required().oneOf([Yup.ref('password')]) : field
  ),
});

export default schema;

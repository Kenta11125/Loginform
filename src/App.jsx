import "./App.css";
import { useState } from "react";
import React from "react";
import "./index.css";


function App() {
  const initialValues = { username: "", mailaddress: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //ログイン情報を送信する
    //バリデーションチェックをする
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex =
      /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if (!values.username) {
      errors.username = "ユーザー名を入力してください";
    }

    if (!values.mailaddress) {
      errors.mailaddress = "メールアドレスを入力してください";
    } else if (!regex.test(values.mailaddress)) {
      errors.mailaddress = "正しいメールアドレスを入力してください";
    }

    if (!values.password) {
      errors.password = "パスワードを入力してください";
    } else if (values.password.length < 4) {
      errors.password = "4文字以上15文字以下のパスワードを入力してください";
    } else if (values.password.length > 15) {
      errors.password = "4文字以上15文字以下のパスワードを入力してください";
    }
    return errors;
  };

  return (
    <div className="formContainer">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>ログインフォーム</h1>
        <hr />
        <div className="uiForm">
          <div className="formField">
            <label>ユーザー名</label>
            <input
              type="text"
              placeholder="username"
              name="username"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p className="errorMsg">{formErrors.username}</p>
          <div className="formField">
            <label>メールアドレス</label>
            <input
              type="text"
              placeholder="mailaddress"
              name="mailaddress"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p className="errorMsg">{formErrors.mailaddress}</p>
          <div className="formField">
            <label>パスワード</label>
            <input
              type="text"
              placeholder="password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p className="errorMsg">{formErrors.password}</p>
          <button className="submitButton">ログイン</button>
          {Object.keys(formErrors).length === 0 && isSubmit && (
            <div className="msgOk">ログインに成功しました</div>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;

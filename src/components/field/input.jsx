import React, { useState } from 'react';
import { Input } from 'antd';
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";

const TextInput = ({
  field,
  label,
  required = false,
  placeholder,
  type = "text",
  hasPassword = false,
  loginClass = false,
  errorMessage = "To'ldirish shart",
  form: { setFieldValue, errors, touched, setFieldTouched },
}) => {
  // State to handle password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="my-2">
      <label className="mt-2 my-2 text-[#151515]">{label}:</label>
      <Input
        className={`${loginClass && "bg-transparent rounded-3xl py-4 my-1 placeholder-white loginClass"}`}
        name={field.name}
        required={required}
        status={touched[field.name] && errors[field.name] && "error"}
        value={field.value}
        onBlur={() => setFieldTouched(field.name, true)}
        onChange={(e) => setFieldValue(field.name, e.target.value)}
        placeholder={label}
        type={hasPassword ? (passwordVisible ? "text" : "password") : type}
        suffix={hasPassword && (
          <span
            onClick={() => setPasswordVisible(!passwordVisible)}
            style={{ cursor: 'pointer' }}
          >
            {passwordVisible ? (
              <UnlockOutlined className='cursor-pointer' style={{ color: '#6200EE', fontSize: '24px' }} />
            ) : (
              <LockOutlined className='cursor-pointer' style={{ color: '#6200EE', fontSize: '24px' }} />
            )}
          </span>
        )}
      />
      {!field.value && touched[field.name] && errors[field.name] && (
        <small className="text-red-500 font-bold text-xs my-4">
          {errorMessage}
        </small>
      )}
    </div>
  );
};

export default TextInput;

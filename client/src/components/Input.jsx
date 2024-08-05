import React, { forwardRef, useId } from "react";

const Input = forwardRef(({ label, type = "text", className = "", ...props }, ref) => {
  const id = useId();
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        className={`${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </>
  );
})

const TextArea = forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();
    // console.log(ref);
    return (
      <>
        {label && <label htmlFor={id}>{label}</label>}
        <textarea
          type={type}
          className={`${className}`}
          ref={ref}
          {...props}
          id={id}
        />
      </>
    );
  }
);

export {
  Input,
  TextArea,
}

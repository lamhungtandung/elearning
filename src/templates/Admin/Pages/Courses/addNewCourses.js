import React, { Fragment, useState } from "react";
import './../../style/StylePages.css';
import { Form, Input, Select } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addCourseUploadImgAction } from "../../../../redux/actions/coursesAdminActions";
import { GROUPID } from "../../../../utilities/Settings/config";

export default function AddNewCourses() {
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();

  const author = useSelector(
    (state) => state.UserManagermentReducer.userSignIn
  );

  
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleChangeFile = async (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg"
    ) {
      await formik.setFieldValue("hinhAnh", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
      formik.setFieldValue('hinhAnh', file);
      
    }
  };
  const toDay = new Date();
  const date =  toDay.getDate() + "/" + (toDay.getMonth() + 1) + "/" + toDay.getFullYear();
  const maKH = `${toDay.getDate()}${(toDay.getMonth() + 1)}${toDay.getFullYear()}${toDay.getHours()}${toDay.getMinutes()}${toDay.getMilliseconds()}`;
console.log(maKH.toString())
const formik = useFormik({
  initialValues: {
    maKhoaHoc:maKH.toString(15),
    biDanh: "",
    tenKhoaHoc: "",
    moTa: "",
    luotXem: 0,
    danhGia: 0,
    hinhAnh: {},
    maNhom: GROUPID,
    ngayTao: "",
    maDanhMucKhoaHoc: "",
    taiKhoanNguoiTao: author.taiKhoan,
  },
  onSubmit: (values) => {
    console.log('values', values);
    values.maNhom = GROUPID;
    let formData = new FormData();
    for (let key in values) {
      if (key !== "hinhAnh") {
        formData.append(key, values[key]);
      } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
      } 
    
    }
    console.log({values})
    dispatch(addCourseUploadImgAction(formData));
  },
});

  return (
    <Fragment>
      <div className="py-12">
        <div className="max-w-7xl flex flex-row items-center mx-auto px-4 xl:px-0 sm:px-6 md:px-8">
        <h3 className="text-4xl">Th??m kho?? h???c</h3>
        </div>
        <div className="max-w-7xl mx-auto xl:px-0 sm:px-6 md:px-8">
          <div
            className="my-6 py-12 shadow-xl bg-white"
            style={{ border: "1px solid #ddd" }}
          >
            <Form
              onSubmitCapture={formik.handleSubmit}
              labelCol={{
                span: 3,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              initialValues={{
                size: componentSize,
              }}
              onValuesChange={onFormLayoutChange}
              size={componentSize}
            >
              <Form.Item label="T??n kh??a h???c">
                <Input name="tenKhoaHoc" onChange={formik.handleChange} />
              </Form.Item>
              <Form.Item label="Danh m???c kh??a h???c">
                <Select name="maDanhMucKhoaHoc" placeholder="Ch???n danh m???c kh??a h???c" onChange={(values)=> formik.setFieldValue('maDanhMucKhoaHoc', values )} >
                  <Select.Option value="BackEnd">L???p tr??nh Backend</Select.Option>
                  <Select.Option value="FrontEnd">L???p tr??nh Front end</Select.Option>
                  <Select.Option value="FullStack">L???p tr??nh Full Stack</Select.Option>
                  <Select.Option value="Design">Thi???t k??? Web</Select.Option>
                  <Select.Option value="DiDong">L???p tr??nh di ?????ng</Select.Option>
                  <Select.Option value="TuDuy">T?? duy l???p tr??nh</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="M?? t???">
                <Input.TextArea name="moTa" onChange={formik.handleChange} />
              </Form.Item>
              <Form.Item label="H??nh ???nh">
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={handleChangeFile}
                />
                <br />
                <div style={{ width: 200, height: "auto" }}>
                  <img src={imgSrc} alt="" />
                </div>
              </Form.Item>
              <Form.Item label="Ng??y t???o">{date}</Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 3,
                }}
                label=""
              >
                <button
                  className="py-2 px-8 hover:shadow-xl transition-all duration-150"
                  type="submit"
                  style={{ backgroundColor: "#e96036", color: "#fff" }}
                >
                  Th??m kho?? h???c
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

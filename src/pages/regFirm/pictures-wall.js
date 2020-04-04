import React from 'react'
import { Upload, Icon, Modal } from 'antd';
import { message } from 'antd'
import { BASE_IMG_URL,BASE_URL } from '../../utils/constant';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {

  constructor(props) {
    super(props)

    let fileList = []

    const { imgs } = this.props;
    console.log('imgs', imgs)
    if (imgs && imgs.length > 0) {
      fileList = imgs.map((img, index) => ({
        uid: -index,
        name: img,
        status: 'done',
        url: BASE_IMG_URL + img,
      }))
      console.log('fileList', fileList)
    }


    this.state = {
      previewVisible: false,  // 是否显示大图预览
      previewImage: '',  // 大图的 url
      fileList
    };
  }

  /**
   * 获取所有已上传图片文件名的数组
   */
  getImgs = () => {
    console.log(this.state.fileList)
    return this.state.fileList.map(file => file.name)
    // return this.state.fileList.forEach(file => {
    //   return {
    //     name: file.name,
    //     url: file.url
    //   }
    // });
  }

  // 隐藏 Modal
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  /**
   * file: 当前操作的图片文件（上传/删除）
   * fileList：所有已上传图片文件对象的数组
   */
  handleChange = ({ file, fileList }) => {
    if (file.status === 'done') {
      const result = file.response;
      if (result.status === 0) {
        // message.success('上传图片成功');
        message.success('上传图片成功')
        const { name, url } = result.data;
        file = fileList[fileList.length - 1];
        file.name = url;
        file.url = url;
      }
    } else if (file.status === 'removed') {  // 删除图片

    }
    this.setState({ fileList });
    // console.log('fileList', this.state.fileList)
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          action={ BASE_URL + "/upload/company/pic"}  // 上传 api
          accept='image/*'  // 只查看图片
          name='image'  // 请求参数名
          listType="picture-card"  // 卡片样式
          fileList={fileList}  // 所有已上传图片内容
          onPreview={this.handlePreview}  // 预览
          onChange={this.handleChange}  // 图片改变时
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>

        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
export default PicturesWall;
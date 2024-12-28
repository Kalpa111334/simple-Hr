import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useUploadPublic } from '@/plugins/upload/client'
import { useNavigate, useParams } from '@remix-run/react'
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Spin,
  Typography,
  Upload,
} from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import { useState } from 'react'
const { Title, Text } = Typography

export default function EmployeeProfilePage() {
  const { employeeId } = useParams()
  const navigate = useNavigate()
  const { user, checkRole } = useUserContext()
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const { mutateAsync: upload } = useUploadPublic()

  const isAdmin = checkRole('ADMIN')
  const isOwnProfile = user?.id === employeeId

  const {
    data: employee,
    isLoading,
    refetch,
  } = Api.user.findFirst.useQuery({
    where: { id: employeeId },
    include: { addresses: true },
  })

  const { mutateAsync: updateUser } = Api.user.update.useMutation()

  if (!employeeId) {
    navigate('/employees')
    return null
  }

  if (isLoading) {
    return (
      <PageLayout layout="full-width">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      </PageLayout>
    )
  }

  if (!employee) {
    return (
      <PageLayout layout="full-width">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Text>Employee not found</Text>
        </div>
      </PageLayout>
    )
  }

  const handleSubmit = async (values: any) => {
    try {
      let pictureUrl = employee.pictureUrl

      if (fileList.length > 0 && fileList[0].originFileObj) {
        const uploadResult = await upload({ file: fileList[0].originFileObj })
        pictureUrl = uploadResult.url
      }

      await updateUser({
        where: { id: employeeId },
        data: {
          name: values.name,
          email: values.email,
          pictureUrl,
        },
      })

      message.success('Profile updated successfully')
      refetch()
    } catch (error) {
      message.error('Failed to update profile')
    }
  }

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList)
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-user-circle"></i> Employee Profile
        </Title>
        <Text type="secondary">View and manage employee information</Text>

        <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
          <Col xs={24} md={8}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <img
                  src={
                    employee.pictureUrl || 'https://i.imgur.com/ZdJSK3Y.jpeg'
                  }
                  alt="Profile"
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    marginBottom: 16,
                  }}
                />
                {(isAdmin || isOwnProfile) && (
                  <Upload
                    accept="image/*"
                    maxCount={1}
                    fileList={fileList}
                    onChange={handleFileChange}
                    beforeUpload={() => false}
                  >
                    <Button icon={<i className="las la-upload"></i>}>
                      Update Photo
                    </Button>
                  </Upload>
                )}
              </div>
            </Card>
          </Col>

          <Col xs={24} md={16}>
            <Card>
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  name: employee.name,
                  email: employee.email,
                  globalRole: employee.globalRole,
                }}
                onFinish={handleSubmit}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input
                    prefix={<i className="las la-user"></i>}
                    disabled={!isAdmin && !isOwnProfile}
                  />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, type: 'email' }]}
                >
                  <Input
                    prefix={<i className="las la-envelope"></i>}
                    disabled={!isAdmin && !isOwnProfile}
                  />
                </Form.Item>

                <Form.Item label="Role" name="globalRole">
                  <Input
                    prefix={<i className="las la-user-tag"></i>}
                    disabled
                  />
                </Form.Item>

                {(isAdmin || isOwnProfile) && (
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<i className="las la-save"></i>}
                    >
                      Save Changes
                    </Button>
                  </Form.Item>
                )}
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}

import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import type { User } from '@prisma/client'
import { useNavigate } from '@remix-run/react'
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Typography,
  message,
} from 'antd'
import { useState } from 'react'
const { Search } = Input
const { Title, Text } = Typography

export default function EmployeeManagementPage() {
  const navigate = useNavigate()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<User | null>(null)
  const [form] = Form.useForm()
  const [searchText, setSearchText] = useState('')
  const [sortedInfo, setSortedInfo] = useState<any>({})

  // Fetch employees
  const { data: employees, refetch } = Api.user.findMany.useQuery({
    include: { attendances: true, leaves: true },
  })

  const filteredEmployees = employees?.filter(
    employee =>
      employee.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      employee.email?.toLowerCase().includes(searchText.toLowerCase()),
  )

  // Mutations
  const { mutateAsync: createUser } = Api.user.create.useMutation()
  const { mutateAsync: updateUser } = Api.user.update.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      if (editingEmployee) {
        await updateUser({
          where: { id: editingEmployee.id },
          data: {
            name: values.name,
            email: values.email,
            globalRole: values.globalRole,
            status: values.status,
          },
        })
        message.success('Employee updated successfully')
      } else {
        await createUser({
          data: {
            name: values.name,
            email: values.email,
            globalRole: values.globalRole,
            status: 'INVITED',
            password: Math.random().toString(36).slice(-8), // Generate random password
          },
        })
        message.success('Employee added successfully')
      }
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      message.error('An error occurred')
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: User, b: User) => (a.name || '').localeCompare(b.name || ''),
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      render: (text: string, record: User) => (
        <a onClick={() => navigate(`/employees/${record.id}`)}>{text}</a>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a: User, b: User) =>
        (a.email || '').localeCompare(b.email || ''),
      sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
    },
    {
      title: 'Role',
      dataIndex: 'globalRole',
      key: 'globalRole',
      sorter: (a: User, b: User) =>
        (a.globalRole || '').localeCompare(b.globalRole || ''),
      sortOrder: sortedInfo.columnKey === 'globalRole' && sortedInfo.order,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a: User, b: User) =>
        (a.status || '').localeCompare(b.status || ''),
      sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditingEmployee(record)
              form.setFieldsValue(record)
              setIsModalVisible(true)
            }}
          >
            <i className="las la-edit"></i> Edit
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <Title level={2}>Employee Management</Title>
            <Text>
              Manage your organization's employees, their roles and access
              levels
            </Text>
          </div>
          <Space>
            <Search
              placeholder="Search by name or email"
              allowClear
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
            <Button
              type="primary"
              onClick={() => {
                setEditingEmployee(null)
                form.resetFields()
                setIsModalVisible(true)
              }}
            >
              <i className="las la-plus"></i> Add Employee
            </Button>
          </Space>
        </div>

        <Table
          onChange={(pagination, filters, sorter) => {
            setSortedInfo(sorter)
          }}
          columns={columns}
          dataSource={filteredEmployees}
          rowKey="id"
          loading={!employees}
          pagination={{ pageSize: 20 }}
        />

        <Modal
          title={editingEmployee ? 'Edit Employee' : 'Add New Employee'}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please input the name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please input the email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="globalRole"
              label="Role"
              rules={[{ required: true, message: 'Please select a role!' }]}
            >
              <Select>
                <Select.Option value="USER">User</Select.Option>
                <Select.Option value="ADMIN">Admin</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {editingEmployee ? 'Update' : 'Create'}
                </Button>
                <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}

import {
  Typography,
  Table,
  Button,
  Form,
  DatePicker,
  Input,
  Select,
  Upload,
  message,
  Space,
  Tag,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function LeaveManagementPage() {
  const { user, checkRole } = useUserContext()
  const isAdmin = checkRole('ADMIN')
  const [form] = Form.useForm()
  const [selectedFile, setSelectedFile] = useState<File>()
  const { mutateAsync: uploadFile } = useUploadPublic()

  // Queries
  const { data: leaves, refetch: refetchLeaves } = Api.leave.findMany.useQuery({
    include: { user: true },
    ...(isAdmin ? {} : { where: { userId: user?.id } }),
  })

  const { data: quotas } = Api.leaveQuota.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { year: 'desc' },
  })

  // Mutations
  const { mutateAsync: createLeave } = Api.leave.create.useMutation()
  const { mutateAsync: updateLeave } = Api.leave.update.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      let documentUrl = ''
      if (selectedFile) {
        const result = await uploadFile({ file: selectedFile })
        documentUrl = result.url
      }

      const startDate = dayjs(values.dateRange[0]).toISOString()
      const endDate = dayjs(values.dateRange[1]).toISOString()

      if (dayjs(startDate).isAfter(endDate)) {
        return message.error('End date must be after start date')
      }

      await createLeave({
        data: {
          startDate,
          endDate,
          type: values.type,
          status: 'PENDING',
          reason: values.reason,
          documentUrl,
          userId: user?.id || '',
        },
      })

      message.success('Leave request submitted successfully')
      form.resetFields()
      refetchLeaves()
    } catch (error) {
      message.error('Failed to submit leave request')
    }
  }

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateLeave({
        where: { id },
        data: { status },
      })
      message.success('Leave status updated successfully')
      refetchLeaves()
    } catch (error) {
      message.error('Failed to update leave status')
    }
  }

  const baseColumns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: DateTime) => {
        const formattedDate = dayjs(date).isValid()
          ? dayjs(date).format('YYYY-MM-DD')
          : 'Invalid date';
        return <Text>{formattedDate}</Text>;
      }
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: DateTime) => {
        const formattedDate = dayjs(date).isValid()
          ? dayjs(date).format('YYYY-MM-DD')
          : 'Invalid date';
        return <Text>{formattedDate}</Text>;
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={
            status === 'APPROVED'
              ? 'green'
              : status === 'REJECTED'
              ? 'red'
              : 'orange'
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          {isAdmin && record.status === 'PENDING' && (
            <>
              <Button
                type="primary"
                onClick={() => handleStatusUpdate(record.id, 'APPROVED')}
              >
                <i className="las la-check" /> Approve
              </Button>
              <Button
                danger
                onClick={() => handleStatusUpdate(record.id, 'REJECTED')}
              >
                <i className="las la-times" /> Reject
              </Button>
            </>
          )}
          {record.documentUrl && (
            <Button href={record.documentUrl} target="_blank">
              <i className="las la-file" /> View Document
            </Button>
          )}
        </Space>
      ),
    },
  ]

  const columns = isAdmin
    ? [
        {
          title: 'Employee',
          dataIndex: ['user', 'name'],
          key: 'employee',
          render: (text: string) => <Text>{text}</Text>,
        },
        ...baseColumns,
      ]
    : baseColumns

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-calendar-minus" /> Leave Management
        </Title>

        {!isAdmin && (
          <>
            <Title level={4}>Leave Quotas</Title>
            <div style={{ marginBottom: 24 }}>
              {quotas?.map(quota => (
                <Tag key={quota.id} color="blue">
                  {quota.type}: {quota.usedDays.toString()}/
                  {quota.totalDays.toString()} days used
                </Tag>
              ))}
            </div>

            <Title level={4}>Submit Leave Request</Title>
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              style={{ marginBottom: 24 }}
            >
              <Form.Item
                name="dateRange"
                label="Leave Period"
                rules={[
                  { required: true, message: 'Please select leave period' },
                  {
                    validator: async (_, value) => {
                      if (!value || !value[0] || !value[1]) return;
                      if (!dayjs(value[0]).isBefore(value[1])) {
                        throw new Error('End date must be after start date');
                      }
                    }
                  }
                ]}
              >
                <DatePicker.RangePicker style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="type"
                label="Leave Type"
                rules={[
                  { required: true, message: 'Please select leave type' },
                ]}
              >
                <Select>
                  <Select.Option value="ANNUAL">Annual Leave</Select.Option>
                  <Select.Option value="SICK">Sick Leave</Select.Option>
                  <Select.Option value="UNPAID">Unpaid Leave</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="reason" label="Reason">
                <Input.TextArea rows={4} />
              </Form.Item>

              <Form.Item name="document" label="Supporting Document">
                <Upload
                  beforeUpload={file => {
                    setSelectedFile(file)
                    return false
                  }}
                  maxCount={1}
                >
                  <Button icon={<i className="las la-upload" />}>
                    Upload Document
                  </Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  <i className="las la-paper-plane" /> Submit Request
                </Button>
              </Form.Item>
            </Form>
          </>
        )}

        <Title level={4}>Leave History</Title>
        <Table
          columns={columns}
          dataSource={leaves}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </div>
    </PageLayout>
  )
}

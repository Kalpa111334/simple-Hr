import {
  Typography,
  Card,
  Button,
  Table,
  DatePicker,
  Space,
  message,
  Select,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
const { RangePicker } = DatePicker
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AttendancePage() {
  const { user, checkRole } = useUserContext()
  const isAdmin = checkRole('ADMIN')
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null)
  const [selectedMethod, setSelectedMethod] = useState<string>('manual')

  const { data: attendances, refetch } = Api.attendance.findMany.useQuery({
    where: {
      ...(isAdmin ? {} : { userId: user?.id }),
      ...(dateRange && dateRange[0] && dateRange[1] ? {
        createdAt: {
          gte: dateRange[0].toISOString(),
          lte: dateRange[1].toISOString(),
        },
      } : {}),
    },
    include: {
      user: true,
    },
  })

  const { mutateAsync: checkIn } = Api.attendance.create.useMutation()
  const { mutateAsync: checkOut } = Api.attendance.update.useMutation()

  const handleCheckIn = async () => {
    try {
      await checkIn({
        data: {
          userId: user?.id || '',
          checkInTime: dayjs().toDate(),
          status: 'PRESENT',
          method: selectedMethod,
          location: 'Office', // Default location
        },
      })
      message.success('Successfully checked in!')
      refetch()
    } catch (error) {
      message.error('Failed to check in')
    }
  }

  const handleCheckOut = async (recordId: string) => {
    try {
      await checkOut({
        where: { id: recordId },
        data: {
          checkOutTime: dayjs().toDate(),
        },
      })
      message.success('Successfully checked out!')
      refetch()
    } catch (error) {
      message.error('Failed to check out')
    }
  }

  const baseColumns = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => {
        const formattedDate = dayjs(date).isValid() 
          ? dayjs(date).format('YYYY-MM-DD')
          : 'Invalid date';
        return formattedDate;
      }
    },
    {
      title: 'Check-in Time',
      dataIndex: 'checkInTime',
      key: 'checkInTime',
      render: (time: Date) => time ? dayjs(time).format('HH:mm:ss') : '-'
    },
    {
      title: 'Check-out Time',
      dataIndex: 'checkOutTime',
      key: 'checkOutTime',
      render: (time: Date) => time ? dayjs(time).format('HH:mm:ss') : '-'
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) =>
        !record.checkOutTime &&
        record.userId === user?.id && (
          <Button onClick={() => handleCheckOut(record.id)} type="primary">
            Check Out
          </Button>
        ),
    },
  ]

  const employeeColumn = {
    title: 'Employee',
    dataIndex: ['user', 'name'],
    key: 'userName',
  }

  const columns = isAdmin ? [employeeColumn, ...baseColumns] : baseColumns

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Card>
          <Title level={2}>
            <i className="las la-clock" /> Attendance Management
          </Title>
          <Text>Track and manage employee attendance records</Text>

          <div style={{ marginTop: 24 }}>
            {!isAdmin && (
              <Card style={{ marginBottom: 24 }}>
                <Space direction="vertical" size="middle">
                  <Title level={4}>Check-in Options</Title>
                  <Space>
                    <Select
                      value={selectedMethod}
                      onChange={setSelectedMethod}
                      style={{ width: 200 }}
                    >
                      <Select.Option value="manual">
                        Manual Check-in
                      </Select.Option>
                      <Select.Option value="facial">
                        Facial Recognition
                      </Select.Option>
                    </Select>
                    <Button
                      type="primary"
                      icon={<i className="las la-sign-in-alt" />}
                      onClick={handleCheckIn}
                    >
                      Check In
                    </Button>
                  </Space>
                </Space>
              </Card>
            )}

            <Space
              style={{ marginBottom: 16 }}
              direction="vertical"
              size="middle"
            >
              <Title level={4}>Attendance Records</Title>
              <Space>
                <RangePicker
                  onChange={dates =>
                    setDateRange(dates as [dayjs.Dayjs | null, dayjs.Dayjs | null])
                  }
                />
                {isAdmin && (
                  <Button
                    icon={<i className="las la-file-export" />}
                    onClick={() =>
                      message.info('Export functionality to be implemented')
                    }
                  >
                    Export Report
                  </Button>
                )}
              </Space>
            </Space>

            <Table
              columns={columns}
              dataSource={attendances}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}

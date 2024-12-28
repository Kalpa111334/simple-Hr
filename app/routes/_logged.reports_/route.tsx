import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import type { Attendance } from '@prisma/client'
import {
  Button,
  Card,
  Col,
  DatePicker,
  Row,
  Select,
  Statistic,
  Table,
  Typography,
} from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
const { Title, Text } = Typography
const { RangePicker } = DatePicker

export default function ReportsPage() {
  const { user, checkRole } = useUserContext()
  const [dateRange, setDateRange] = useState<[string, string]>(['', ''])
  const [selectedDepartment, setSelectedDepartment] = useState<string>('')
  const [selectedEmployee, setSelectedEmployee] = useState<string>('')

  // Fetch all users for the employee selector
  const { data: users } = Api.user.findMany.useQuery({
    include: { attendances: true },
  })

  // Fetch attendances based on filters
  const { data: attendances } = Api.attendance.findMany.useQuery({
    where: {
      userId: selectedEmployee || (checkRole('ADMIN') ? undefined : user?.id),
      createdAt: {
        gte: dateRange[0] ? new Date(dateRange[0]) : undefined,
        lte: dateRange[1] ? new Date(dateRange[1]) : undefined,
      },
    },
    include: { user: true },
  })

  const columns = [
    {
      title: 'Employee',
      dataIndex: ['user', 'name'],
      key: 'name',
    },
    {
      title: 'Check In',
      dataIndex: 'checkInTime',
      key: 'checkIn',
      render: (time: string) => {
        if (!time) return '-'
        return dayjs(time).isValid()
          ? dayjs(time).format('YYYY-MM-DD HH:mm')
          : 'Invalid date'
      },
    },
    {
      title: 'Check Out',
      dataIndex: 'checkOutTime',
      key: 'checkOut',
      render: (time: string) => {
        if (!time) return '-'
        return dayjs(time).isValid()
          ? dayjs(time).format('YYYY-MM-DD HH:mm')
          : 'Invalid date'
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ]

  const calculateStatistics = (data: Attendance[] | undefined) => {
    if (!data) return { total: 0, onTime: 0, late: 0 }

    const total = data.length
    const onTime = data.filter(a => a.status === 'ON_TIME').length
    const late = data.filter(a => a.status === 'LATE').length

    return { total, onTime, late }
  }

  const stats = calculateStatistics(attendances)

  const handleExport = () => {
    if (!attendances) return

    const csvContent = [
      ['Employee', 'Check In', 'Check Out', 'Status'].join(','),
      ...attendances.map(a =>
        [
          a.user?.name,
          a.checkInTime ? dayjs(a.checkInTime).format('YYYY-MM-DD HH:mm') : '',
          a.checkOutTime
            ? dayjs(a.checkOutTime).format('YYYY-MM-DD HH:mm')
            : '',
          a.status,
        ].join(','),
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'attendance_report.csv'
    a.click()
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <Title level={2}>
          <i className="las la-chart-bar" style={{ marginRight: '8px' }}></i>
          Attendance Reports
        </Title>
        <Text type="secondary">
          Generate and analyze attendance reports for employees
        </Text>

        <Card style={{ marginTop: '24px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <RangePicker
                style={{ width: '100%' }}
                onChange={dates => {
                  if (dates) {
                    setDateRange([
                      dates[0]?.toISOString() || '',
                      dates[1]?.toISOString() || '',
                    ])
                  }
                }}
              />
            </Col>
            {checkRole('ADMIN') && (
              <>
                <Col xs={24} md={8}>
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Select Employee"
                    allowClear
                    onChange={setSelectedEmployee}
                  >
                    {users?.map(user => (
                      <Select.Option key={user.id} value={user.id}>
                        {user.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
                <Col xs={24} md={8}>
                  <Button type="primary" onClick={handleExport}>
                    <i
                      className="las la-file-export"
                      style={{ marginRight: '8px' }}
                    ></i>
                    Export CSV
                  </Button>
                </Col>
              </>
            )}
          </Row>

          <Row gutter={16} style={{ marginTop: '24px' }}>
            <Col span={8}>
              <Statistic
                title="Total Attendances"
                value={stats.total}
                prefix={<i className="las la-users" />}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="On Time"
                value={stats.onTime}
                prefix={<i className="las la-clock" />}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Late"
                value={stats.late}
                prefix={<i className="las la-exclamation-triangle" />}
              />
            </Col>
          </Row>

          <Table
            style={{ marginTop: '24px' }}
            columns={columns}
            dataSource={attendances}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>
    </PageLayout>
  )
}

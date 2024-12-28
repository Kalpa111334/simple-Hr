import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { Badge, Card, Col, Empty, List, Row, Statistic, Typography } from 'antd'
import dayjs from 'dayjs'
const { Title, Text } = Typography

export default function HomePage() {
  const { user, checkRole } = useUserContext()
  const isAdmin = checkRole('ADMIN')

  // Fetch attendance data
  const { data: todayAttendance } = Api.attendance.findFirst.useQuery({
    where: {
      userId: user?.id,
      createdAt: { gte: dayjs().startOf('day').toISOString() },
    },
  })

  // Fetch leave quotas
  const { data: leaveQuotas } = Api.leaveQuota.findMany.useQuery({
    where: { userId: user?.id },
  })

  // Fetch notifications
  const { data: notifications } = Api.notification.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  // Admin: Fetch daily attendance statistics
  const { data: todayAttendances } = Api.attendance.findMany.useQuery(
    isAdmin
      ? {
          where: { createdAt: { gte: dayjs().startOf('day').toISOString() } },
          include: { user: true },
        }
      : undefined,
  )

  // Admin: Fetch pending leaves
  const { data: pendingLeaves } = Api.leave.findMany.useQuery(
    isAdmin
      ? {
          where: { status: 'PENDING' },
          include: { user: true },
        }
      : undefined,
  )

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-tachometer-alt"></i> Dashboard
        </Title>
        <Text type="secondary">Welcome back! Here's your overview.</Text>

        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          {!isAdmin && (
            <>
              {/* Employee Dashboard */}
              <Col xs={24} md={8}>
                <Card
                  title={
                    <>
                      <i className="las la-clock"></i> Today's Attendance
                    </>
                  }
                >
                  <Badge
                    status={
                      todayAttendance?.status === 'PRESENT'
                        ? 'success'
                        : 'warning'
                    }
                    text={todayAttendance?.status || 'Not Checked In'}
                  />
                  {todayAttendance?.checkInTime && (
                    <div style={{ marginTop: 8 }}>
                      <Text>
                        Check-in:{' '}
                        {dayjs(todayAttendance.checkInTime).isValid()
                          ? dayjs(todayAttendance.checkInTime).format('HH:mm')
                          : 'Invalid date'}
                      </Text>
                    </div>
                  )}
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card
                  title={
                    <>
                      <i className="las la-calendar"></i> Leave Balance
                    </>
                  }
                >
                  {leaveQuotas?.map(quota => (
                    <div key={quota.id} style={{ marginBottom: 8 }}>
                      <Text>{quota.type}: </Text>
                      <Text strong>
                        {(quota.totalDays - quota.usedDays).toString()} days
                        remaining
                      </Text>
                    </div>
                  ))}
                </Card>
              </Col>
            </>
          )}

          {isAdmin && (
            <>
              {/* Admin Dashboard */}
              <Col xs={24} md={8}>
                <Card
                  title={
                    <>
                      <i className="las la-users"></i> Today's Attendance
                    </>
                  }
                >
                  <Statistic
                    title="Present Employees"
                    value={
                      todayAttendances?.filter(a => a.status === 'PRESENT')
                        .length || 0
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card
                  title={
                    <>
                      <i className="las la-clock"></i> Pending Approvals
                    </>
                  }
                >
                  <Statistic
                    title="Leave Requests"
                    value={pendingLeaves?.length || 0}
                  />
                </Card>
              </Col>
            </>
          )}

          <Col xs={24} md={8}>
            <Card
              title={
                <>
                  <i className="las la-bell"></i> Recent Notifications
                </>
              }
            >
              {notifications?.length ? (
                <List
                  dataSource={notifications}
                  renderItem={notification => (
                    <List.Item>
                      <Badge
                        status={notification.isRead ? 'default' : 'processing'}
                        text={notification.title}
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="No notifications" />
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('3a91b3f1-f2e7-4ef4-ae77-9493dab2e970', '9Vicente35@gmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=11', 'mno345token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('07dc5057-3882-44b6-acff-b6bccc83b139', '17Crystal_Emmerich40@gmail.com', 'Alex Jones', 'https://i.imgur.com/YfJQV5z.png?id=19', 'jkl012token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('9f1b41c9-1ed9-46e6-8411-78a741ff3d22', '25Imogene.Ondricka87@yahoo.com', 'Emily Brown', 'https://i.imgur.com/YfJQV5z.png?id=27', 'def456token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('ac8e6cd8-763e-4ab0-8fc0-312c30b3704e', '33Humberto73@gmail.com', 'Emily Brown', 'https://i.imgur.com/YfJQV5z.png?id=35', 'jkl012token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('d4e8d196-20e7-4753-b1cf-a017c61250b0', '41Keshaun57@gmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=43', 'abc123token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('e5c29c68-3ab6-46a2-ab7a-3f9a9c86d9af', '49Teresa9@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=51', 'ghi789token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('52ae595a-640b-40d6-bbf2-71343b76bd00', '57Charity95@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=59', 'mno345token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('e44fd1eb-cc28-428c-b9f3-d4d87ac7fd0e', '65Louisa.Crona12@yahoo.com', 'Michael White', 'https://i.imgur.com/YfJQV5z.png?id=67', 'abc123token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('08df65d9-a6c9-4fd9-8f54-c2a20fa71b11', '73Daija.Luettgen@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=75', 'jkl012token', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('d7e35de7-6ee9-4546-a23f-851edab39858', 'c29tZSByYW5kb20gc3Vic2NyaXB0aW9uIGNvbnRlbnQ', '08df65d9-a6c9-4fd9-8f54-c2a20fa71b11');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('94a0c8ea-2d63-443b-81ba-8b5897517ba7', 'c3Vic2NyaXB0aW9uIGRhdGEgd2l0aCBhIGxvbmcgc3RyaW5n', 'e44fd1eb-cc28-428c-b9f3-d4d87ac7fd0e');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('a0e94964-0214-487b-b0e1-c5d8b0c3aec9', 'c3Vic2NyaXB0aW9uIGNvbnRlbnQgd2l0aCBleHRyYSBkYXRh', 'ac8e6cd8-763e-4ab0-8fc0-312c30b3704e');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('c9054cf6-9bdb-4927-b7fd-e9fdb5c6a206', 'c3Vic2NyaXB0aW9uIGNvbnRlbnQgd2l0aCBleHRyYSBkYXRh', '52ae595a-640b-40d6-bbf2-71343b76bd00');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('9d6fe197-f096-47f2-8127-62634e2d18cb', 'c3Vic2NyaXB0aW9uIGNvbnRlbnQgd2l0aCBleHRyYSBkYXRh', '08df65d9-a6c9-4fd9-8f54-c2a20fa71b11');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('f58512fd-9be0-4cd2-8260-c84f075aa47b', 'dGhpcyBpcyBhIHRlc3Qgc3Vic2NyaXB0aW9u', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('e4bc2be4-dfab-45be-9e28-588fe3190a10', 'c3Vic2NyaXB0aW9uIGNvbnRlbnQgd2l0aCBleHRyYSBkYXRh', '9f1b41c9-1ed9-46e6-8411-78a741ff3d22');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('b7cb8dc0-0d9e-4a13-8dc8-ba6b9991a11d', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', '9f1b41c9-1ed9-46e6-8411-78a741ff3d22');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('fe54cef2-15e0-4690-925b-d0f413a06a8c', 'c3Vic2NyaXB0aW9uIGRhdGEgd2l0aCBhIGxvbmcgc3RyaW5n', '52ae595a-640b-40d6-bbf2-71343b76bd00');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('5d4f7f6b-513e-4836-9d8e-df2a4ab11117', 'c3Vic2NyaXB0aW9uIGNvbnRlbnQgd2l0aCBleHRyYSBkYXRh', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "Attendance" ("id", "checkInTime", "checkOutTime", "status", "method", "userId") VALUES ('c7c8125b-6354-4c5c-ae7d-b82b29d66e72', '2025-06-28T02:29:24.894Z', '2024-05-15T05:11:41.847Z', 'On Leave', 'Manual CheckIn', '52ae595a-640b-40d6-bbf2-71343b76bd00');
INSERT INTO "Attendance" ("id", "checkInTime", "checkOutTime", "status", "method", "userId") VALUES ('fa3205c2-8ebc-4554-96a3-e72dd3fab0f5', '2024-08-18T03:50:32.003Z', '2024-04-09T08:14:04.876Z', 'Checked In', 'Biometric', '3a91b3f1-f2e7-4ef4-ae77-9493dab2e970');
INSERT INTO "Attendance" ("id", "checkInTime", "checkOutTime", "status", "method", "userId") VALUES ('b114c46c-08e1-424e-aabd-4173b33d1ef5', '2025-10-14T21:23:19.715Z', '2024-01-02T09:00:00.471Z', 'On Leave', 'Biometric', '08df65d9-a6c9-4fd9-8f54-c2a20fa71b11');
INSERT INTO "Attendance" ("id", "checkInTime", "checkOutTime", "status", "method", "userId") VALUES ('09d22f0d-92df-420b-b379-a46c6b8973eb', '2025-08-20T16:24:52.703Z', '2024-04-05T22:34:52.021Z', 'Checked Out', 'Web Portal', 'e5c29c68-3ab6-46a2-ab7a-3f9a9c86d9af');
INSERT INTO "Attendance" ("id", "checkInTime", "checkOutTime", "status", "method", "userId") VALUES ('eccdecca-8951-4d42-af37-85315aaef765', '2024-05-18T09:01:55.270Z', '2024-02-11T03:10:23.155Z', 'Absent', 'Facial Recognition', '9f1b41c9-1ed9-46e6-8411-78a741ff3d22');
INSERT INTO "Attendance" ("id", "checkInTime", "checkOutTime", "status", "method", "userId") VALUES ('996ae84e-0256-49ae-8f01-d77203e63295', '2024-09-16T10:45:37.035Z', '2025-06-12T02:17:43.688Z', 'Absent', 'Biometric', '3a91b3f1-f2e7-4ef4-ae77-9493dab2e970');
INSERT INTO "Attendance" ("id", "checkInTime", "checkOutTime", "status", "method", "userId") VALUES ('7e0f7c64-e83a-4836-8322-4c1816388a20', '2025-07-08T17:10:09.141Z', '2025-03-13T22:39:46.243Z', 'Checked Out', 'Web Portal', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Attendance" ("id", "checkInTime", "checkOutTime", "status", "method", "userId") VALUES ('744034c3-4941-489c-98d8-20f4c20cfca8', '2025-12-06T02:58:05.124Z', '2024-01-22T18:30:00.987Z', 'Late', 'Mobile App', '07dc5057-3882-44b6-acff-b6bccc83b139');
INSERT INTO "Attendance" ("id", "checkInTime", "checkOutTime", "status", "method", "userId") VALUES ('f89270cc-3baa-4839-b5d0-8bdd27915c34', '2025-08-17T17:07:18.725Z', '2025-11-09T10:07:31.969Z', 'On Leave', 'Facial Recognition', 'e44fd1eb-cc28-428c-b9f3-d4d87ac7fd0e');
INSERT INTO "Attendance" ("id", "checkInTime", "checkOutTime", "status", "method", "userId") VALUES ('f000feeb-829c-48df-85d9-81f42c0eb30f', '2024-09-30T03:01:56.363Z', '2025-07-01T04:30:52.409Z', 'Checked In', 'Mobile App', 'ac8e6cd8-763e-4ab0-8fc0-312c30b3704e');

INSERT INTO "Leave" ("id", "startDate", "endDate", "type", "status", "documentUrl", "reason", "userId") VALUES ('4d490b50-ccc9-4c62-8d2b-00091db321bb', '2024-09-19T04:38:03.864Z', '2024-04-29T20:46:12.453Z', 'Maternity', 'Pending', 'https://i.imgur.com/YfJQV5z.png?id=155', 'Family emergency', 'd4e8d196-20e7-4753-b1cf-a017c61250b0');
INSERT INTO "Leave" ("id", "startDate", "endDate", "type", "status", "documentUrl", "reason", "userId") VALUES ('0cc12c3e-8a18-4b4b-b6bc-ab1465d5c08e', '2024-07-27T15:48:55.217Z', '2024-10-08T08:42:37.768Z', 'Sick', 'Pending', 'https://i.imgur.com/YfJQV5z.png?id=162', 'Family emergency', 'e5c29c68-3ab6-46a2-ab7a-3f9a9c86d9af');
INSERT INTO "Leave" ("id", "startDate", "endDate", "type", "status", "documentUrl", "reason", "userId") VALUES ('521f58bd-682d-476d-be91-cb3ce4f1c8f0', '2025-10-04T18:34:11.456Z', '2025-07-29T02:56:26.979Z', 'Casual', 'Pending', 'https://i.imgur.com/YfJQV5z.png?id=169', 'Medical appointment', 'e5c29c68-3ab6-46a2-ab7a-3f9a9c86d9af');
INSERT INTO "Leave" ("id", "startDate", "endDate", "type", "status", "documentUrl", "reason", "userId") VALUES ('f0ee7404-5401-4613-b99d-d9fc0a021551', '2025-04-20T00:31:41.559Z', '2025-06-30T03:02:28.562Z', 'Paternity', 'Pending', 'https://i.imgur.com/YfJQV5z.png?id=176', 'Vacation', 'd4e8d196-20e7-4753-b1cf-a017c61250b0');
INSERT INTO "Leave" ("id", "startDate", "endDate", "type", "status", "documentUrl", "reason", "userId") VALUES ('55f29b5a-2683-48d6-8113-623570dbdece', '2024-10-07T16:16:11.009Z', '2025-08-15T17:12:16.961Z', 'Paternity', 'Approved', 'https://i.imgur.com/YfJQV5z.png?id=183', 'Childcare', 'd4e8d196-20e7-4753-b1cf-a017c61250b0');
INSERT INTO "Leave" ("id", "startDate", "endDate", "type", "status", "documentUrl", "reason", "userId") VALUES ('b4a03b24-7cba-4fc8-93e0-f3ba8bd07e25', '2024-08-10T17:30:59.947Z', '2025-12-04T19:51:59.357Z', 'Paternity', 'Approved', 'https://i.imgur.com/YfJQV5z.png?id=190', 'Vacation', '07dc5057-3882-44b6-acff-b6bccc83b139');
INSERT INTO "Leave" ("id", "startDate", "endDate", "type", "status", "documentUrl", "reason", "userId") VALUES ('edef6a95-aad1-4daa-88fb-b2c2488ab484', '2024-02-23T21:44:05.298Z', '2025-04-19T06:41:28.033Z', 'Annual', 'Rejected', 'https://i.imgur.com/YfJQV5z.png?id=197', 'Personal reasons', '9f1b41c9-1ed9-46e6-8411-78a741ff3d22');
INSERT INTO "Leave" ("id", "startDate", "endDate", "type", "status", "documentUrl", "reason", "userId") VALUES ('b2442d87-c5ab-404b-b8ae-f7879bbc8da4', '2025-10-25T09:47:12.162Z', '2024-08-01T11:20:15.959Z', 'Annual', 'Pending', 'https://i.imgur.com/YfJQV5z.png?id=204', 'Childcare', 'd4e8d196-20e7-4753-b1cf-a017c61250b0');
INSERT INTO "Leave" ("id", "startDate", "endDate", "type", "status", "documentUrl", "reason", "userId") VALUES ('7f7c6020-bac0-4cd1-a541-6483b9032598', '2024-05-18T23:51:40.892Z', '2024-07-27T14:27:57.844Z', 'Casual', 'Rejected', 'https://i.imgur.com/YfJQV5z.png?id=211', 'Family emergency', '9f1b41c9-1ed9-46e6-8411-78a741ff3d22');
INSERT INTO "Leave" ("id", "startDate", "endDate", "type", "status", "documentUrl", "reason", "userId") VALUES ('6705ca30-762d-4802-9e84-d989dac598e0', '2024-03-23T15:55:17.740Z', '2025-06-11T11:54:46.441Z', 'Annual', 'Pending', 'https://i.imgur.com/YfJQV5z.png?id=218', 'Vacation', '08df65d9-a6c9-4fd9-8f54-c2a20fa71b11');

INSERT INTO "LeaveQuota" ("id", "type", "totalDays", "usedDays", "year", "userId") VALUES ('9e273264-d223-4973-87f4-3b515410f2ac', 'Casual', 181, 976, 630, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "LeaveQuota" ("id", "type", "totalDays", "usedDays", "year", "userId") VALUES ('dc2f99d7-19de-41e5-82b6-754e9bee57b2', 'Maternity', 67, 921, 954, '9f1b41c9-1ed9-46e6-8411-78a741ff3d22');
INSERT INTO "LeaveQuota" ("id", "type", "totalDays", "usedDays", "year", "userId") VALUES ('dfbad555-768a-4389-a86c-24c3ad0e0112', 'Paternity', 104, 1, 840, '3a91b3f1-f2e7-4ef4-ae77-9493dab2e970');
INSERT INTO "LeaveQuota" ("id", "type", "totalDays", "usedDays", "year", "userId") VALUES ('8770374f-26d1-448d-bc21-95ee590323cd', 'Sick', 909, 838, 572, '52ae595a-640b-40d6-bbf2-71343b76bd00');
INSERT INTO "LeaveQuota" ("id", "type", "totalDays", "usedDays", "year", "userId") VALUES ('1553af6c-8f26-4d93-9760-489da0a55f43', 'Casual', 306, 45, 709, 'd4e8d196-20e7-4753-b1cf-a017c61250b0');
INSERT INTO "LeaveQuota" ("id", "type", "totalDays", "usedDays", "year", "userId") VALUES ('56a2efa0-6c8e-4d36-a03a-e980617bba94', 'Casual', 866, 485, 798, 'ac8e6cd8-763e-4ab0-8fc0-312c30b3704e');
INSERT INTO "LeaveQuota" ("id", "type", "totalDays", "usedDays", "year", "userId") VALUES ('0a63e366-3bc9-4860-917f-31cf29ea9a00', 'Sick', 956, 412, 738, '3a91b3f1-f2e7-4ef4-ae77-9493dab2e970');
INSERT INTO "LeaveQuota" ("id", "type", "totalDays", "usedDays", "year", "userId") VALUES ('1032aa39-3cac-468b-8854-2badfdc1d666', 'Sick', 461, 966, 730, 'e44fd1eb-cc28-428c-b9f3-d4d87ac7fd0e');
INSERT INTO "LeaveQuota" ("id", "type", "totalDays", "usedDays", "year", "userId") VALUES ('9d96767d-6406-475d-9ac0-b54860f88c2e', 'Maternity', 90, 131, 668, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "LeaveQuota" ("id", "type", "totalDays", "usedDays", "year", "userId") VALUES ('a5f47191-259f-4e76-998c-d068ea71770f', 'Maternity', 547, 263, 389, '3a91b3f1-f2e7-4ef4-ae77-9493dab2e970');

INSERT INTO "Notification" ("id", "title", "message", "type", "isRead", "userId") VALUES ('27aea97d-705f-44e6-98cc-774358e62e08', 'Monthly Performance Review', 'Please review the updated company policy.', 'Performance', true, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Notification" ("id", "title", "message", "type", "isRead", "userId") VALUES ('97dac940-c7bf-4ce9-ba39-1ac475449406', 'Attendance Confirmation', 'Please review the updated company policy.', 'Policy', false, '3a91b3f1-f2e7-4ef4-ae77-9493dab2e970');
INSERT INTO "Notification" ("id", "title", "message", "type", "isRead", "userId") VALUES ('5cc51605-542b-42cd-8a0f-d38f48c03a7b', 'Attendance Confirmation', 'Your performance review for this month is available.', 'Performance', false, '52ae595a-640b-40d6-bbf2-71343b76bd00');
INSERT INTO "Notification" ("id", "title", "message", "type", "isRead", "userId") VALUES ('9d0bee3b-9d0f-4790-a01a-359e05c3fe0a', 'Attendance Confirmation', 'Your attendance has been successfully marked.', 'Attendance', false, 'e44fd1eb-cc28-428c-b9f3-d4d87ac7fd0e');
INSERT INTO "Notification" ("id", "title", "message", "type", "isRead", "userId") VALUES ('646ec71c-9a1f-488f-a516-f2757737846e', 'Attendance Confirmation', 'Please review the updated company policy.', 'Performance', false, 'd4e8d196-20e7-4753-b1cf-a017c61250b0');
INSERT INTO "Notification" ("id", "title", "message", "type", "isRead", "userId") VALUES ('7fd1a243-2d96-4513-8de0-3008f096feb0', 'Monthly Performance Review', 'Please review the updated company policy.', 'Policy', true, '52ae595a-640b-40d6-bbf2-71343b76bd00');
INSERT INTO "Notification" ("id", "title", "message", "type", "isRead", "userId") VALUES ('11cd025c-c512-4caf-b2e6-6078ec630aa0', 'System Maintenance Notification', 'Please review the updated company policy.', 'Leave', false, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Notification" ("id", "title", "message", "type", "isRead", "userId") VALUES ('6b2abdbb-eca8-49bb-8ac5-a143f592caca', 'System Maintenance Notification', 'Scheduled maintenance will occur this weekend.', 'Leave', false, '52ae595a-640b-40d6-bbf2-71343b76bd00');
INSERT INTO "Notification" ("id", "title", "message", "type", "isRead", "userId") VALUES ('521299ef-9a26-4165-afbf-f6bb57c31be6', 'System Maintenance Notification', 'Your leave request has been approved by the admin.', 'Performance', false, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Notification" ("id", "title", "message", "type", "isRead", "userId") VALUES ('e8391ce4-28f8-43d2-82cb-c1e9488b1332', 'System Maintenance Notification', 'Scheduled maintenance will occur this weekend.', 'Attendance', false, 'e44fd1eb-cc28-428c-b9f3-d4d87ac7fd0e');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })

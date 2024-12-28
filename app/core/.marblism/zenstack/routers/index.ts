/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@zenstackhq/runtime/models";
import createUserRouter from "./User.router";
import createAttendanceRouter from "./Attendance.router";
import createLeaveRouter from "./Leave.router";
import createLeaveQuotaRouter from "./LeaveQuota.router";
import createNotificationRouter from "./Notification.router";
import createPwaSubscriptionRouter from "./PwaSubscription.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as AttendanceClientType } from "./Attendance.router";
import { ClientType as LeaveClientType } from "./Leave.router";
import { ClientType as LeaveQuotaClientType } from "./LeaveQuota.router";
import { ClientType as NotificationClientType } from "./Notification.router";
import { ClientType as PwaSubscriptionClientType } from "./PwaSubscription.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        attendance: createAttendanceRouter(router, procedure),
        leave: createLeaveRouter(router, procedure),
        leaveQuota: createLeaveQuotaRouter(router, procedure),
        notification: createNotificationRouter(router, procedure),
        pwaSubscription: createPwaSubscriptionRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    attendance: AttendanceClientType<AppRouter>;
    leave: LeaveClientType<AppRouter>;
    leaveQuota: LeaveQuotaClientType<AppRouter>;
    notification: NotificationClientType<AppRouter>;
    pwaSubscription: PwaSubscriptionClientType<AppRouter>;
}

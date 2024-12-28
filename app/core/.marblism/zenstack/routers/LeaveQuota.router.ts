/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@zenstackhq/runtime/models';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.LeaveQuotaInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).leaveQuota.createMany(input as any))),

        create: procedure.input($Schema.LeaveQuotaInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).leaveQuota.create(input as any))),

        deleteMany: procedure.input($Schema.LeaveQuotaInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).leaveQuota.deleteMany(input as any))),

        delete: procedure.input($Schema.LeaveQuotaInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).leaveQuota.delete(input as any))),

        findFirst: procedure.input($Schema.LeaveQuotaInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).leaveQuota.findFirst(input as any))),

        findMany: procedure.input($Schema.LeaveQuotaInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).leaveQuota.findMany(input as any))),

        findUnique: procedure.input($Schema.LeaveQuotaInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).leaveQuota.findUnique(input as any))),

        updateMany: procedure.input($Schema.LeaveQuotaInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).leaveQuota.updateMany(input as any))),

        update: procedure.input($Schema.LeaveQuotaInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).leaveQuota.update(input as any))),

        count: procedure.input($Schema.LeaveQuotaInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).leaveQuota.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.LeaveQuotaCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LeaveQuotaCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LeaveQuotaCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LeaveQuotaCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.LeaveQuotaCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LeaveQuotaCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.LeaveQuotaGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.LeaveQuotaGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LeaveQuotaCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LeaveQuotaCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.LeaveQuotaGetPayload<T>, Context>) => Promise<Prisma.LeaveQuotaGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.LeaveQuotaDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LeaveQuotaDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LeaveQuotaDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LeaveQuotaDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.LeaveQuotaDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LeaveQuotaDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.LeaveQuotaGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.LeaveQuotaGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LeaveQuotaDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LeaveQuotaDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.LeaveQuotaGetPayload<T>, Context>) => Promise<Prisma.LeaveQuotaGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.LeaveQuotaFindFirstArgs, TData = Prisma.LeaveQuotaGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.LeaveQuotaFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.LeaveQuotaGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.LeaveQuotaFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.LeaveQuotaFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.LeaveQuotaGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.LeaveQuotaGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.LeaveQuotaFindManyArgs, TData = Array<Prisma.LeaveQuotaGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.LeaveQuotaFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.LeaveQuotaGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.LeaveQuotaFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.LeaveQuotaFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.LeaveQuotaGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.LeaveQuotaGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.LeaveQuotaFindUniqueArgs, TData = Prisma.LeaveQuotaGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.LeaveQuotaFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.LeaveQuotaGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.LeaveQuotaFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.LeaveQuotaFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.LeaveQuotaGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.LeaveQuotaGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.LeaveQuotaUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LeaveQuotaUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LeaveQuotaUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LeaveQuotaUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.LeaveQuotaUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LeaveQuotaUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.LeaveQuotaGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.LeaveQuotaGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LeaveQuotaUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LeaveQuotaUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.LeaveQuotaGetPayload<T>, Context>) => Promise<Prisma.LeaveQuotaGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.LeaveQuotaCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.LeaveQuotaCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.LeaveQuotaCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.LeaveQuotaCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.LeaveQuotaCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.LeaveQuotaCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.LeaveQuotaCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.LeaveQuotaCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}

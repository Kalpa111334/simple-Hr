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

        createMany: procedure.input($Schema.LeaveInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).leave.createMany(input as any))),

        create: procedure.input($Schema.LeaveInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).leave.create(input as any))),

        deleteMany: procedure.input($Schema.LeaveInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).leave.deleteMany(input as any))),

        delete: procedure.input($Schema.LeaveInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).leave.delete(input as any))),

        findFirst: procedure.input($Schema.LeaveInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).leave.findFirst(input as any))),

        findMany: procedure.input($Schema.LeaveInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).leave.findMany(input as any))),

        findUnique: procedure.input($Schema.LeaveInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).leave.findUnique(input as any))),

        updateMany: procedure.input($Schema.LeaveInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).leave.updateMany(input as any))),

        update: procedure.input($Schema.LeaveInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).leave.update(input as any))),

        count: procedure.input($Schema.LeaveInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).leave.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.LeaveCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LeaveCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LeaveCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LeaveCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.LeaveCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LeaveCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.LeaveGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.LeaveGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LeaveCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LeaveCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.LeaveGetPayload<T>, Context>) => Promise<Prisma.LeaveGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.LeaveDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LeaveDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LeaveDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LeaveDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.LeaveDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LeaveDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.LeaveGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.LeaveGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LeaveDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LeaveDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.LeaveGetPayload<T>, Context>) => Promise<Prisma.LeaveGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.LeaveFindFirstArgs, TData = Prisma.LeaveGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.LeaveFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.LeaveGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.LeaveFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.LeaveFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.LeaveGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.LeaveGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.LeaveFindManyArgs, TData = Array<Prisma.LeaveGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.LeaveFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.LeaveGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.LeaveFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.LeaveFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.LeaveGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.LeaveGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.LeaveFindUniqueArgs, TData = Prisma.LeaveGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.LeaveFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.LeaveGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.LeaveFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.LeaveFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.LeaveGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.LeaveGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.LeaveUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LeaveUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LeaveUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LeaveUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.LeaveUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LeaveUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.LeaveGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.LeaveGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LeaveUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LeaveUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.LeaveGetPayload<T>, Context>) => Promise<Prisma.LeaveGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.LeaveCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.LeaveCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.LeaveCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.LeaveCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.LeaveCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.LeaveCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.LeaveCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.LeaveCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}

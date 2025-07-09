
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model usuarios_global
 * 
 */
export type usuarios_global = $Result.DefaultSelection<Prisma.$usuarios_globalPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Usuarios_globals
 * const usuarios_globals = await prisma.usuarios_global.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Usuarios_globals
   * const usuarios_globals = await prisma.usuarios_global.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.usuarios_global`: Exposes CRUD operations for the **usuarios_global** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios_globals
    * const usuarios_globals = await prisma.usuarios_global.findMany()
    * ```
    */
  get usuarios_global(): Prisma.usuarios_globalDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.11.1
   * Query Engine version: f40f79ec31188888a2e33acda0ecc8fd10a853a9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    usuarios_global: 'usuarios_global'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "usuarios_global"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      usuarios_global: {
        payload: Prisma.$usuarios_globalPayload<ExtArgs>
        fields: Prisma.usuarios_globalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usuarios_globalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarios_globalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usuarios_globalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarios_globalPayload>
          }
          findFirst: {
            args: Prisma.usuarios_globalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarios_globalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usuarios_globalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarios_globalPayload>
          }
          findMany: {
            args: Prisma.usuarios_globalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarios_globalPayload>[]
          }
          create: {
            args: Prisma.usuarios_globalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarios_globalPayload>
          }
          createMany: {
            args: Prisma.usuarios_globalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usuarios_globalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarios_globalPayload>[]
          }
          delete: {
            args: Prisma.usuarios_globalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarios_globalPayload>
          }
          update: {
            args: Prisma.usuarios_globalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarios_globalPayload>
          }
          deleteMany: {
            args: Prisma.usuarios_globalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usuarios_globalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usuarios_globalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarios_globalPayload>[]
          }
          upsert: {
            args: Prisma.usuarios_globalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarios_globalPayload>
          }
          aggregate: {
            args: Prisma.Usuarios_globalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuarios_global>
          }
          groupBy: {
            args: Prisma.usuarios_globalGroupByArgs<ExtArgs>
            result: $Utils.Optional<Usuarios_globalGroupByOutputType>[]
          }
          count: {
            args: Prisma.usuarios_globalCountArgs<ExtArgs>
            result: $Utils.Optional<Usuarios_globalCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    usuarios_global?: usuarios_globalOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model usuarios_global
   */

  export type AggregateUsuarios_global = {
    _count: Usuarios_globalCountAggregateOutputType | null
    _min: Usuarios_globalMinAggregateOutputType | null
    _max: Usuarios_globalMaxAggregateOutputType | null
  }

  export type Usuarios_globalMinAggregateOutputType = {
    id: string | null
    creado_en: Date | null
    actualizado_en: Date | null
    nombre: string | null
    email: string | null
    password: string | null
    image: string | null
    telefono: string | null
    genero: string | null
    fecha_nacimiento: Date | null
    nacionalidad: string | null
  }

  export type Usuarios_globalMaxAggregateOutputType = {
    id: string | null
    creado_en: Date | null
    actualizado_en: Date | null
    nombre: string | null
    email: string | null
    password: string | null
    image: string | null
    telefono: string | null
    genero: string | null
    fecha_nacimiento: Date | null
    nacionalidad: string | null
  }

  export type Usuarios_globalCountAggregateOutputType = {
    id: number
    creado_en: number
    actualizado_en: number
    nombre: number
    email: number
    password: number
    image: number
    telefono: number
    genero: number
    fecha_nacimiento: number
    nacionalidad: number
    _all: number
  }


  export type Usuarios_globalMinAggregateInputType = {
    id?: true
    creado_en?: true
    actualizado_en?: true
    nombre?: true
    email?: true
    password?: true
    image?: true
    telefono?: true
    genero?: true
    fecha_nacimiento?: true
    nacionalidad?: true
  }

  export type Usuarios_globalMaxAggregateInputType = {
    id?: true
    creado_en?: true
    actualizado_en?: true
    nombre?: true
    email?: true
    password?: true
    image?: true
    telefono?: true
    genero?: true
    fecha_nacimiento?: true
    nacionalidad?: true
  }

  export type Usuarios_globalCountAggregateInputType = {
    id?: true
    creado_en?: true
    actualizado_en?: true
    nombre?: true
    email?: true
    password?: true
    image?: true
    telefono?: true
    genero?: true
    fecha_nacimiento?: true
    nacionalidad?: true
    _all?: true
  }

  export type Usuarios_globalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which usuarios_global to aggregate.
     */
    where?: usuarios_globalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios_globals to fetch.
     */
    orderBy?: usuarios_globalOrderByWithRelationInput | usuarios_globalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usuarios_globalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios_globals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios_globals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned usuarios_globals
    **/
    _count?: true | Usuarios_globalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Usuarios_globalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Usuarios_globalMaxAggregateInputType
  }

  export type GetUsuarios_globalAggregateType<T extends Usuarios_globalAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuarios_global]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuarios_global[P]>
      : GetScalarType<T[P], AggregateUsuarios_global[P]>
  }




  export type usuarios_globalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usuarios_globalWhereInput
    orderBy?: usuarios_globalOrderByWithAggregationInput | usuarios_globalOrderByWithAggregationInput[]
    by: Usuarios_globalScalarFieldEnum[] | Usuarios_globalScalarFieldEnum
    having?: usuarios_globalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Usuarios_globalCountAggregateInputType | true
    _min?: Usuarios_globalMinAggregateInputType
    _max?: Usuarios_globalMaxAggregateInputType
  }

  export type Usuarios_globalGroupByOutputType = {
    id: string
    creado_en: Date | null
    actualizado_en: Date | null
    nombre: string | null
    email: string
    password: string | null
    image: string | null
    telefono: string | null
    genero: string | null
    fecha_nacimiento: Date | null
    nacionalidad: string | null
    _count: Usuarios_globalCountAggregateOutputType | null
    _min: Usuarios_globalMinAggregateOutputType | null
    _max: Usuarios_globalMaxAggregateOutputType | null
  }

  type GetUsuarios_globalGroupByPayload<T extends usuarios_globalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Usuarios_globalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Usuarios_globalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Usuarios_globalGroupByOutputType[P]>
            : GetScalarType<T[P], Usuarios_globalGroupByOutputType[P]>
        }
      >
    >


  export type usuarios_globalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creado_en?: boolean
    actualizado_en?: boolean
    nombre?: boolean
    email?: boolean
    password?: boolean
    image?: boolean
    telefono?: boolean
    genero?: boolean
    fecha_nacimiento?: boolean
    nacionalidad?: boolean
  }, ExtArgs["result"]["usuarios_global"]>

  export type usuarios_globalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creado_en?: boolean
    actualizado_en?: boolean
    nombre?: boolean
    email?: boolean
    password?: boolean
    image?: boolean
    telefono?: boolean
    genero?: boolean
    fecha_nacimiento?: boolean
    nacionalidad?: boolean
  }, ExtArgs["result"]["usuarios_global"]>

  export type usuarios_globalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creado_en?: boolean
    actualizado_en?: boolean
    nombre?: boolean
    email?: boolean
    password?: boolean
    image?: boolean
    telefono?: boolean
    genero?: boolean
    fecha_nacimiento?: boolean
    nacionalidad?: boolean
  }, ExtArgs["result"]["usuarios_global"]>

  export type usuarios_globalSelectScalar = {
    id?: boolean
    creado_en?: boolean
    actualizado_en?: boolean
    nombre?: boolean
    email?: boolean
    password?: boolean
    image?: boolean
    telefono?: boolean
    genero?: boolean
    fecha_nacimiento?: boolean
    nacionalidad?: boolean
  }

  export type usuarios_globalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "creado_en" | "actualizado_en" | "nombre" | "email" | "password" | "image" | "telefono" | "genero" | "fecha_nacimiento" | "nacionalidad", ExtArgs["result"]["usuarios_global"]>

  export type $usuarios_globalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "usuarios_global"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      creado_en: Date | null
      actualizado_en: Date | null
      nombre: string | null
      email: string
      password: string | null
      image: string | null
      telefono: string | null
      genero: string | null
      fecha_nacimiento: Date | null
      nacionalidad: string | null
    }, ExtArgs["result"]["usuarios_global"]>
    composites: {}
  }

  type usuarios_globalGetPayload<S extends boolean | null | undefined | usuarios_globalDefaultArgs> = $Result.GetResult<Prisma.$usuarios_globalPayload, S>

  type usuarios_globalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usuarios_globalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Usuarios_globalCountAggregateInputType | true
    }

  export interface usuarios_globalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['usuarios_global'], meta: { name: 'usuarios_global' } }
    /**
     * Find zero or one Usuarios_global that matches the filter.
     * @param {usuarios_globalFindUniqueArgs} args - Arguments to find a Usuarios_global
     * @example
     * // Get one Usuarios_global
     * const usuarios_global = await prisma.usuarios_global.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usuarios_globalFindUniqueArgs>(args: SelectSubset<T, usuarios_globalFindUniqueArgs<ExtArgs>>): Prisma__usuarios_globalClient<$Result.GetResult<Prisma.$usuarios_globalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuarios_global that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usuarios_globalFindUniqueOrThrowArgs} args - Arguments to find a Usuarios_global
     * @example
     * // Get one Usuarios_global
     * const usuarios_global = await prisma.usuarios_global.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usuarios_globalFindUniqueOrThrowArgs>(args: SelectSubset<T, usuarios_globalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usuarios_globalClient<$Result.GetResult<Prisma.$usuarios_globalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuarios_global that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarios_globalFindFirstArgs} args - Arguments to find a Usuarios_global
     * @example
     * // Get one Usuarios_global
     * const usuarios_global = await prisma.usuarios_global.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usuarios_globalFindFirstArgs>(args?: SelectSubset<T, usuarios_globalFindFirstArgs<ExtArgs>>): Prisma__usuarios_globalClient<$Result.GetResult<Prisma.$usuarios_globalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuarios_global that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarios_globalFindFirstOrThrowArgs} args - Arguments to find a Usuarios_global
     * @example
     * // Get one Usuarios_global
     * const usuarios_global = await prisma.usuarios_global.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usuarios_globalFindFirstOrThrowArgs>(args?: SelectSubset<T, usuarios_globalFindFirstOrThrowArgs<ExtArgs>>): Prisma__usuarios_globalClient<$Result.GetResult<Prisma.$usuarios_globalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios_globals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarios_globalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios_globals
     * const usuarios_globals = await prisma.usuarios_global.findMany()
     * 
     * // Get first 10 Usuarios_globals
     * const usuarios_globals = await prisma.usuarios_global.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarios_globalWithIdOnly = await prisma.usuarios_global.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usuarios_globalFindManyArgs>(args?: SelectSubset<T, usuarios_globalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuarios_globalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuarios_global.
     * @param {usuarios_globalCreateArgs} args - Arguments to create a Usuarios_global.
     * @example
     * // Create one Usuarios_global
     * const Usuarios_global = await prisma.usuarios_global.create({
     *   data: {
     *     // ... data to create a Usuarios_global
     *   }
     * })
     * 
     */
    create<T extends usuarios_globalCreateArgs>(args: SelectSubset<T, usuarios_globalCreateArgs<ExtArgs>>): Prisma__usuarios_globalClient<$Result.GetResult<Prisma.$usuarios_globalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios_globals.
     * @param {usuarios_globalCreateManyArgs} args - Arguments to create many Usuarios_globals.
     * @example
     * // Create many Usuarios_globals
     * const usuarios_global = await prisma.usuarios_global.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usuarios_globalCreateManyArgs>(args?: SelectSubset<T, usuarios_globalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios_globals and returns the data saved in the database.
     * @param {usuarios_globalCreateManyAndReturnArgs} args - Arguments to create many Usuarios_globals.
     * @example
     * // Create many Usuarios_globals
     * const usuarios_global = await prisma.usuarios_global.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios_globals and only return the `id`
     * const usuarios_globalWithIdOnly = await prisma.usuarios_global.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usuarios_globalCreateManyAndReturnArgs>(args?: SelectSubset<T, usuarios_globalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuarios_globalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuarios_global.
     * @param {usuarios_globalDeleteArgs} args - Arguments to delete one Usuarios_global.
     * @example
     * // Delete one Usuarios_global
     * const Usuarios_global = await prisma.usuarios_global.delete({
     *   where: {
     *     // ... filter to delete one Usuarios_global
     *   }
     * })
     * 
     */
    delete<T extends usuarios_globalDeleteArgs>(args: SelectSubset<T, usuarios_globalDeleteArgs<ExtArgs>>): Prisma__usuarios_globalClient<$Result.GetResult<Prisma.$usuarios_globalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuarios_global.
     * @param {usuarios_globalUpdateArgs} args - Arguments to update one Usuarios_global.
     * @example
     * // Update one Usuarios_global
     * const usuarios_global = await prisma.usuarios_global.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usuarios_globalUpdateArgs>(args: SelectSubset<T, usuarios_globalUpdateArgs<ExtArgs>>): Prisma__usuarios_globalClient<$Result.GetResult<Prisma.$usuarios_globalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios_globals.
     * @param {usuarios_globalDeleteManyArgs} args - Arguments to filter Usuarios_globals to delete.
     * @example
     * // Delete a few Usuarios_globals
     * const { count } = await prisma.usuarios_global.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usuarios_globalDeleteManyArgs>(args?: SelectSubset<T, usuarios_globalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios_globals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarios_globalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios_globals
     * const usuarios_global = await prisma.usuarios_global.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usuarios_globalUpdateManyArgs>(args: SelectSubset<T, usuarios_globalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios_globals and returns the data updated in the database.
     * @param {usuarios_globalUpdateManyAndReturnArgs} args - Arguments to update many Usuarios_globals.
     * @example
     * // Update many Usuarios_globals
     * const usuarios_global = await prisma.usuarios_global.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios_globals and only return the `id`
     * const usuarios_globalWithIdOnly = await prisma.usuarios_global.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usuarios_globalUpdateManyAndReturnArgs>(args: SelectSubset<T, usuarios_globalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuarios_globalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuarios_global.
     * @param {usuarios_globalUpsertArgs} args - Arguments to update or create a Usuarios_global.
     * @example
     * // Update or create a Usuarios_global
     * const usuarios_global = await prisma.usuarios_global.upsert({
     *   create: {
     *     // ... data to create a Usuarios_global
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuarios_global we want to update
     *   }
     * })
     */
    upsert<T extends usuarios_globalUpsertArgs>(args: SelectSubset<T, usuarios_globalUpsertArgs<ExtArgs>>): Prisma__usuarios_globalClient<$Result.GetResult<Prisma.$usuarios_globalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios_globals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarios_globalCountArgs} args - Arguments to filter Usuarios_globals to count.
     * @example
     * // Count the number of Usuarios_globals
     * const count = await prisma.usuarios_global.count({
     *   where: {
     *     // ... the filter for the Usuarios_globals we want to count
     *   }
     * })
    **/
    count<T extends usuarios_globalCountArgs>(
      args?: Subset<T, usuarios_globalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Usuarios_globalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuarios_global.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Usuarios_globalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Usuarios_globalAggregateArgs>(args: Subset<T, Usuarios_globalAggregateArgs>): Prisma.PrismaPromise<GetUsuarios_globalAggregateType<T>>

    /**
     * Group by Usuarios_global.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarios_globalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usuarios_globalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usuarios_globalGroupByArgs['orderBy'] }
        : { orderBy?: usuarios_globalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usuarios_globalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarios_globalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the usuarios_global model
   */
  readonly fields: usuarios_globalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for usuarios_global.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usuarios_globalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the usuarios_global model
   */
  interface usuarios_globalFieldRefs {
    readonly id: FieldRef<"usuarios_global", 'String'>
    readonly creado_en: FieldRef<"usuarios_global", 'DateTime'>
    readonly actualizado_en: FieldRef<"usuarios_global", 'DateTime'>
    readonly nombre: FieldRef<"usuarios_global", 'String'>
    readonly email: FieldRef<"usuarios_global", 'String'>
    readonly password: FieldRef<"usuarios_global", 'String'>
    readonly image: FieldRef<"usuarios_global", 'String'>
    readonly telefono: FieldRef<"usuarios_global", 'String'>
    readonly genero: FieldRef<"usuarios_global", 'String'>
    readonly fecha_nacimiento: FieldRef<"usuarios_global", 'DateTime'>
    readonly nacionalidad: FieldRef<"usuarios_global", 'String'>
  }
    

  // Custom InputTypes
  /**
   * usuarios_global findUnique
   */
  export type usuarios_globalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios_global
     */
    select?: usuarios_globalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios_global
     */
    omit?: usuarios_globalOmit<ExtArgs> | null
    /**
     * Filter, which usuarios_global to fetch.
     */
    where: usuarios_globalWhereUniqueInput
  }

  /**
   * usuarios_global findUniqueOrThrow
   */
  export type usuarios_globalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios_global
     */
    select?: usuarios_globalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios_global
     */
    omit?: usuarios_globalOmit<ExtArgs> | null
    /**
     * Filter, which usuarios_global to fetch.
     */
    where: usuarios_globalWhereUniqueInput
  }

  /**
   * usuarios_global findFirst
   */
  export type usuarios_globalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios_global
     */
    select?: usuarios_globalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios_global
     */
    omit?: usuarios_globalOmit<ExtArgs> | null
    /**
     * Filter, which usuarios_global to fetch.
     */
    where?: usuarios_globalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios_globals to fetch.
     */
    orderBy?: usuarios_globalOrderByWithRelationInput | usuarios_globalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for usuarios_globals.
     */
    cursor?: usuarios_globalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios_globals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios_globals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of usuarios_globals.
     */
    distinct?: Usuarios_globalScalarFieldEnum | Usuarios_globalScalarFieldEnum[]
  }

  /**
   * usuarios_global findFirstOrThrow
   */
  export type usuarios_globalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios_global
     */
    select?: usuarios_globalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios_global
     */
    omit?: usuarios_globalOmit<ExtArgs> | null
    /**
     * Filter, which usuarios_global to fetch.
     */
    where?: usuarios_globalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios_globals to fetch.
     */
    orderBy?: usuarios_globalOrderByWithRelationInput | usuarios_globalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for usuarios_globals.
     */
    cursor?: usuarios_globalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios_globals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios_globals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of usuarios_globals.
     */
    distinct?: Usuarios_globalScalarFieldEnum | Usuarios_globalScalarFieldEnum[]
  }

  /**
   * usuarios_global findMany
   */
  export type usuarios_globalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios_global
     */
    select?: usuarios_globalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios_global
     */
    omit?: usuarios_globalOmit<ExtArgs> | null
    /**
     * Filter, which usuarios_globals to fetch.
     */
    where?: usuarios_globalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios_globals to fetch.
     */
    orderBy?: usuarios_globalOrderByWithRelationInput | usuarios_globalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing usuarios_globals.
     */
    cursor?: usuarios_globalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios_globals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios_globals.
     */
    skip?: number
    distinct?: Usuarios_globalScalarFieldEnum | Usuarios_globalScalarFieldEnum[]
  }

  /**
   * usuarios_global create
   */
  export type usuarios_globalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios_global
     */
    select?: usuarios_globalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios_global
     */
    omit?: usuarios_globalOmit<ExtArgs> | null
    /**
     * The data needed to create a usuarios_global.
     */
    data: XOR<usuarios_globalCreateInput, usuarios_globalUncheckedCreateInput>
  }

  /**
   * usuarios_global createMany
   */
  export type usuarios_globalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many usuarios_globals.
     */
    data: usuarios_globalCreateManyInput | usuarios_globalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * usuarios_global createManyAndReturn
   */
  export type usuarios_globalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios_global
     */
    select?: usuarios_globalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios_global
     */
    omit?: usuarios_globalOmit<ExtArgs> | null
    /**
     * The data used to create many usuarios_globals.
     */
    data: usuarios_globalCreateManyInput | usuarios_globalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * usuarios_global update
   */
  export type usuarios_globalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios_global
     */
    select?: usuarios_globalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios_global
     */
    omit?: usuarios_globalOmit<ExtArgs> | null
    /**
     * The data needed to update a usuarios_global.
     */
    data: XOR<usuarios_globalUpdateInput, usuarios_globalUncheckedUpdateInput>
    /**
     * Choose, which usuarios_global to update.
     */
    where: usuarios_globalWhereUniqueInput
  }

  /**
   * usuarios_global updateMany
   */
  export type usuarios_globalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update usuarios_globals.
     */
    data: XOR<usuarios_globalUpdateManyMutationInput, usuarios_globalUncheckedUpdateManyInput>
    /**
     * Filter which usuarios_globals to update
     */
    where?: usuarios_globalWhereInput
    /**
     * Limit how many usuarios_globals to update.
     */
    limit?: number
  }

  /**
   * usuarios_global updateManyAndReturn
   */
  export type usuarios_globalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios_global
     */
    select?: usuarios_globalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios_global
     */
    omit?: usuarios_globalOmit<ExtArgs> | null
    /**
     * The data used to update usuarios_globals.
     */
    data: XOR<usuarios_globalUpdateManyMutationInput, usuarios_globalUncheckedUpdateManyInput>
    /**
     * Filter which usuarios_globals to update
     */
    where?: usuarios_globalWhereInput
    /**
     * Limit how many usuarios_globals to update.
     */
    limit?: number
  }

  /**
   * usuarios_global upsert
   */
  export type usuarios_globalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios_global
     */
    select?: usuarios_globalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios_global
     */
    omit?: usuarios_globalOmit<ExtArgs> | null
    /**
     * The filter to search for the usuarios_global to update in case it exists.
     */
    where: usuarios_globalWhereUniqueInput
    /**
     * In case the usuarios_global found by the `where` argument doesn't exist, create a new usuarios_global with this data.
     */
    create: XOR<usuarios_globalCreateInput, usuarios_globalUncheckedCreateInput>
    /**
     * In case the usuarios_global was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usuarios_globalUpdateInput, usuarios_globalUncheckedUpdateInput>
  }

  /**
   * usuarios_global delete
   */
  export type usuarios_globalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios_global
     */
    select?: usuarios_globalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios_global
     */
    omit?: usuarios_globalOmit<ExtArgs> | null
    /**
     * Filter which usuarios_global to delete.
     */
    where: usuarios_globalWhereUniqueInput
  }

  /**
   * usuarios_global deleteMany
   */
  export type usuarios_globalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which usuarios_globals to delete
     */
    where?: usuarios_globalWhereInput
    /**
     * Limit how many usuarios_globals to delete.
     */
    limit?: number
  }

  /**
   * usuarios_global without action
   */
  export type usuarios_globalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios_global
     */
    select?: usuarios_globalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios_global
     */
    omit?: usuarios_globalOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Usuarios_globalScalarFieldEnum: {
    id: 'id',
    creado_en: 'creado_en',
    actualizado_en: 'actualizado_en',
    nombre: 'nombre',
    email: 'email',
    password: 'password',
    image: 'image',
    telefono: 'telefono',
    genero: 'genero',
    fecha_nacimiento: 'fecha_nacimiento',
    nacionalidad: 'nacionalidad'
  };

  export type Usuarios_globalScalarFieldEnum = (typeof Usuarios_globalScalarFieldEnum)[keyof typeof Usuarios_globalScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type usuarios_globalWhereInput = {
    AND?: usuarios_globalWhereInput | usuarios_globalWhereInput[]
    OR?: usuarios_globalWhereInput[]
    NOT?: usuarios_globalWhereInput | usuarios_globalWhereInput[]
    id?: UuidFilter<"usuarios_global"> | string
    creado_en?: DateTimeNullableFilter<"usuarios_global"> | Date | string | null
    actualizado_en?: DateTimeNullableFilter<"usuarios_global"> | Date | string | null
    nombre?: StringNullableFilter<"usuarios_global"> | string | null
    email?: StringFilter<"usuarios_global"> | string
    password?: StringNullableFilter<"usuarios_global"> | string | null
    image?: StringNullableFilter<"usuarios_global"> | string | null
    telefono?: StringNullableFilter<"usuarios_global"> | string | null
    genero?: StringNullableFilter<"usuarios_global"> | string | null
    fecha_nacimiento?: DateTimeNullableFilter<"usuarios_global"> | Date | string | null
    nacionalidad?: StringNullableFilter<"usuarios_global"> | string | null
  }

  export type usuarios_globalOrderByWithRelationInput = {
    id?: SortOrder
    creado_en?: SortOrderInput | SortOrder
    actualizado_en?: SortOrderInput | SortOrder
    nombre?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    telefono?: SortOrderInput | SortOrder
    genero?: SortOrderInput | SortOrder
    fecha_nacimiento?: SortOrderInput | SortOrder
    nacionalidad?: SortOrderInput | SortOrder
  }

  export type usuarios_globalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: usuarios_globalWhereInput | usuarios_globalWhereInput[]
    OR?: usuarios_globalWhereInput[]
    NOT?: usuarios_globalWhereInput | usuarios_globalWhereInput[]
    creado_en?: DateTimeNullableFilter<"usuarios_global"> | Date | string | null
    actualizado_en?: DateTimeNullableFilter<"usuarios_global"> | Date | string | null
    nombre?: StringNullableFilter<"usuarios_global"> | string | null
    password?: StringNullableFilter<"usuarios_global"> | string | null
    image?: StringNullableFilter<"usuarios_global"> | string | null
    telefono?: StringNullableFilter<"usuarios_global"> | string | null
    genero?: StringNullableFilter<"usuarios_global"> | string | null
    fecha_nacimiento?: DateTimeNullableFilter<"usuarios_global"> | Date | string | null
    nacionalidad?: StringNullableFilter<"usuarios_global"> | string | null
  }, "id" | "email">

  export type usuarios_globalOrderByWithAggregationInput = {
    id?: SortOrder
    creado_en?: SortOrderInput | SortOrder
    actualizado_en?: SortOrderInput | SortOrder
    nombre?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    telefono?: SortOrderInput | SortOrder
    genero?: SortOrderInput | SortOrder
    fecha_nacimiento?: SortOrderInput | SortOrder
    nacionalidad?: SortOrderInput | SortOrder
    _count?: usuarios_globalCountOrderByAggregateInput
    _max?: usuarios_globalMaxOrderByAggregateInput
    _min?: usuarios_globalMinOrderByAggregateInput
  }

  export type usuarios_globalScalarWhereWithAggregatesInput = {
    AND?: usuarios_globalScalarWhereWithAggregatesInput | usuarios_globalScalarWhereWithAggregatesInput[]
    OR?: usuarios_globalScalarWhereWithAggregatesInput[]
    NOT?: usuarios_globalScalarWhereWithAggregatesInput | usuarios_globalScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"usuarios_global"> | string
    creado_en?: DateTimeNullableWithAggregatesFilter<"usuarios_global"> | Date | string | null
    actualizado_en?: DateTimeNullableWithAggregatesFilter<"usuarios_global"> | Date | string | null
    nombre?: StringNullableWithAggregatesFilter<"usuarios_global"> | string | null
    email?: StringWithAggregatesFilter<"usuarios_global"> | string
    password?: StringNullableWithAggregatesFilter<"usuarios_global"> | string | null
    image?: StringNullableWithAggregatesFilter<"usuarios_global"> | string | null
    telefono?: StringNullableWithAggregatesFilter<"usuarios_global"> | string | null
    genero?: StringNullableWithAggregatesFilter<"usuarios_global"> | string | null
    fecha_nacimiento?: DateTimeNullableWithAggregatesFilter<"usuarios_global"> | Date | string | null
    nacionalidad?: StringNullableWithAggregatesFilter<"usuarios_global"> | string | null
  }

  export type usuarios_globalCreateInput = {
    id?: string
    creado_en?: Date | string | null
    actualizado_en?: Date | string | null
    nombre?: string | null
    email: string
    password?: string | null
    image?: string | null
    telefono?: string | null
    genero?: string | null
    fecha_nacimiento?: Date | string | null
    nacionalidad?: string | null
  }

  export type usuarios_globalUncheckedCreateInput = {
    id?: string
    creado_en?: Date | string | null
    actualizado_en?: Date | string | null
    nombre?: string | null
    email: string
    password?: string | null
    image?: string | null
    telefono?: string | null
    genero?: string | null
    fecha_nacimiento?: Date | string | null
    nacionalidad?: string | null
  }

  export type usuarios_globalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualizado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    genero?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_nacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nacionalidad?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usuarios_globalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualizado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    genero?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_nacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nacionalidad?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usuarios_globalCreateManyInput = {
    id?: string
    creado_en?: Date | string | null
    actualizado_en?: Date | string | null
    nombre?: string | null
    email: string
    password?: string | null
    image?: string | null
    telefono?: string | null
    genero?: string | null
    fecha_nacimiento?: Date | string | null
    nacionalidad?: string | null
  }

  export type usuarios_globalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualizado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    genero?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_nacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nacionalidad?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usuarios_globalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    creado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualizado_en?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    genero?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_nacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nacionalidad?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type usuarios_globalCountOrderByAggregateInput = {
    id?: SortOrder
    creado_en?: SortOrder
    actualizado_en?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    image?: SortOrder
    telefono?: SortOrder
    genero?: SortOrder
    fecha_nacimiento?: SortOrder
    nacionalidad?: SortOrder
  }

  export type usuarios_globalMaxOrderByAggregateInput = {
    id?: SortOrder
    creado_en?: SortOrder
    actualizado_en?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    image?: SortOrder
    telefono?: SortOrder
    genero?: SortOrder
    fecha_nacimiento?: SortOrder
    nacionalidad?: SortOrder
  }

  export type usuarios_globalMinOrderByAggregateInput = {
    id?: SortOrder
    creado_en?: SortOrder
    actualizado_en?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    image?: SortOrder
    telefono?: SortOrder
    genero?: SortOrder
    fecha_nacimiento?: SortOrder
    nacionalidad?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}

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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model EventSection
 * 
 */
export type EventSection = $Result.DefaultSelection<Prisma.$EventSectionPayload>
/**
 * Model SectionFile
 * 
 */
export type SectionFile = $Result.DefaultSelection<Prisma.$SectionFilePayload>
/**
 * Model EventUserList
 * 
 */
export type EventUserList = $Result.DefaultSelection<Prisma.$EventUserListPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  SUPERVISOR: 'SUPERVISOR',
  MANAGER: 'MANAGER',
  LOGISTIC: 'LOGISTIC',
  DRIVER: 'DRIVER',
  DISPATCH: 'DISPATCH',
  ASSISTANT_MANAGER: 'ASSISTANT_MANAGER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const UserLevel: {
  MASTER: 'MASTER',
  ADMIN: 'ADMIN',
  STAFF: 'STAFF'
};

export type UserLevel = (typeof UserLevel)[keyof typeof UserLevel]


export const GenericRequestStatus: {
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
  ACCEPTED: 'ACCEPTED'
};

export type GenericRequestStatus = (typeof GenericRequestStatus)[keyof typeof GenericRequestStatus]


export const USAState: {
  ALABAMA: 'ALABAMA',
  ALASKA: 'ALASKA',
  ARIZONA: 'ARIZONA',
  ARKANSAS: 'ARKANSAS',
  CALIFORNIA: 'CALIFORNIA',
  COLORADO: 'COLORADO',
  CONNECTICUT: 'CONNECTICUT',
  DELAWARE: 'DELAWARE',
  FLORIDA: 'FLORIDA',
  GEORGIA: 'GEORGIA',
  HAWAII: 'HAWAII',
  IDAHO: 'IDAHO',
  ILLINOIS: 'ILLINOIS',
  INDIANA: 'INDIANA',
  IOWA: 'IOWA',
  KANSAS: 'KANSAS',
  KENTUCKY: 'KENTUCKY',
  LOUISIANA: 'LOUISIANA',
  MAINE: 'MAINE',
  MARYLAND: 'MARYLAND',
  MASSACHUSETTS: 'MASSACHUSETTS',
  MICHIGAN: 'MICHIGAN',
  MINNESOTA: 'MINNESOTA',
  MISSISSIPPI: 'MISSISSIPPI',
  MISSOURI: 'MISSOURI',
  MONTANA: 'MONTANA',
  NEBRASKA: 'NEBRASKA',
  NEVADA: 'NEVADA',
  NEW_HAMPSHIRE: 'NEW_HAMPSHIRE',
  NEW_JERSEY: 'NEW_JERSEY',
  NEW_MEXICO: 'NEW_MEXICO',
  NEW_YORK: 'NEW_YORK',
  NORTH_CAROLINA: 'NORTH_CAROLINA',
  NORTH_DAKOTA: 'NORTH_DAKOTA',
  OHIO: 'OHIO',
  OKLAHOMA: 'OKLAHOMA',
  OREGON: 'OREGON',
  PENNSYLVANIA: 'PENNSYLVANIA',
  RHODE_ISLAND: 'RHODE_ISLAND',
  SOUTH_CAROLINA: 'SOUTH_CAROLINA',
  SOUTH_DAKOTA: 'SOUTH_DAKOTA',
  TENNESSEE: 'TENNESSEE',
  TEXAS: 'TEXAS',
  UTAH: 'UTAH',
  VERMONT: 'VERMONT',
  VIRGINIA: 'VIRGINIA',
  WASHINGTON: 'WASHINGTON',
  WEST_VIRGINIA: 'WEST_VIRGINIA',
  WISCONSIN: 'WISCONSIN',
  WYOMING: 'WYOMING'
};

export type USAState = (typeof USAState)[keyof typeof USAState]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type UserLevel = $Enums.UserLevel

export const UserLevel: typeof $Enums.UserLevel

export type GenericRequestStatus = $Enums.GenericRequestStatus

export const GenericRequestStatus: typeof $Enums.GenericRequestStatus

export type USAState = $Enums.USAState

export const USAState: typeof $Enums.USAState

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eventSection`: Exposes CRUD operations for the **EventSection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventSections
    * const eventSections = await prisma.eventSection.findMany()
    * ```
    */
  get eventSection(): Prisma.EventSectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sectionFile`: Exposes CRUD operations for the **SectionFile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SectionFiles
    * const sectionFiles = await prisma.sectionFile.findMany()
    * ```
    */
  get sectionFile(): Prisma.SectionFileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eventUserList`: Exposes CRUD operations for the **EventUserList** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventUserLists
    * const eventUserLists = await prisma.eventUserList.findMany()
    * ```
    */
  get eventUserList(): Prisma.EventUserListDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
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
    User: 'User',
    Event: 'Event',
    EventSection: 'EventSection',
    SectionFile: 'SectionFile',
    EventUserList: 'EventUserList'
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
      modelProps: "user" | "event" | "eventSection" | "sectionFile" | "eventUserList"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      EventSection: {
        payload: Prisma.$EventSectionPayload<ExtArgs>
        fields: Prisma.EventSectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventSectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventSectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventSectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventSectionPayload>
          }
          findFirst: {
            args: Prisma.EventSectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventSectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventSectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventSectionPayload>
          }
          findMany: {
            args: Prisma.EventSectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventSectionPayload>[]
          }
          create: {
            args: Prisma.EventSectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventSectionPayload>
          }
          createMany: {
            args: Prisma.EventSectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventSectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventSectionPayload>[]
          }
          delete: {
            args: Prisma.EventSectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventSectionPayload>
          }
          update: {
            args: Prisma.EventSectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventSectionPayload>
          }
          deleteMany: {
            args: Prisma.EventSectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventSectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventSectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventSectionPayload>[]
          }
          upsert: {
            args: Prisma.EventSectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventSectionPayload>
          }
          aggregate: {
            args: Prisma.EventSectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventSection>
          }
          groupBy: {
            args: Prisma.EventSectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventSectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventSectionCountArgs<ExtArgs>
            result: $Utils.Optional<EventSectionCountAggregateOutputType> | number
          }
        }
      }
      SectionFile: {
        payload: Prisma.$SectionFilePayload<ExtArgs>
        fields: Prisma.SectionFileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SectionFileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionFilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SectionFileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionFilePayload>
          }
          findFirst: {
            args: Prisma.SectionFileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionFilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SectionFileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionFilePayload>
          }
          findMany: {
            args: Prisma.SectionFileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionFilePayload>[]
          }
          create: {
            args: Prisma.SectionFileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionFilePayload>
          }
          createMany: {
            args: Prisma.SectionFileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SectionFileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionFilePayload>[]
          }
          delete: {
            args: Prisma.SectionFileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionFilePayload>
          }
          update: {
            args: Prisma.SectionFileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionFilePayload>
          }
          deleteMany: {
            args: Prisma.SectionFileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SectionFileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SectionFileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionFilePayload>[]
          }
          upsert: {
            args: Prisma.SectionFileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionFilePayload>
          }
          aggregate: {
            args: Prisma.SectionFileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSectionFile>
          }
          groupBy: {
            args: Prisma.SectionFileGroupByArgs<ExtArgs>
            result: $Utils.Optional<SectionFileGroupByOutputType>[]
          }
          count: {
            args: Prisma.SectionFileCountArgs<ExtArgs>
            result: $Utils.Optional<SectionFileCountAggregateOutputType> | number
          }
        }
      }
      EventUserList: {
        payload: Prisma.$EventUserListPayload<ExtArgs>
        fields: Prisma.EventUserListFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventUserListFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventUserListPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventUserListFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventUserListPayload>
          }
          findFirst: {
            args: Prisma.EventUserListFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventUserListPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventUserListFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventUserListPayload>
          }
          findMany: {
            args: Prisma.EventUserListFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventUserListPayload>[]
          }
          create: {
            args: Prisma.EventUserListCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventUserListPayload>
          }
          createMany: {
            args: Prisma.EventUserListCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventUserListCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventUserListPayload>[]
          }
          delete: {
            args: Prisma.EventUserListDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventUserListPayload>
          }
          update: {
            args: Prisma.EventUserListUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventUserListPayload>
          }
          deleteMany: {
            args: Prisma.EventUserListDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUserListUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventUserListUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventUserListPayload>[]
          }
          upsert: {
            args: Prisma.EventUserListUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventUserListPayload>
          }
          aggregate: {
            args: Prisma.EventUserListAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventUserList>
          }
          groupBy: {
            args: Prisma.EventUserListGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventUserListGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventUserListCountArgs<ExtArgs>
            result: $Utils.Optional<EventUserListCountAggregateOutputType> | number
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
    user?: UserOmit
    event?: EventOmit
    eventSection?: EventSectionOmit
    sectionFile?: SectionFileOmit
    eventUserList?: EventUserListOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    eventUserList: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eventUserList?: boolean | UserCountOutputTypeCountEventUserListArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEventUserListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventUserListWhereInput
  }


  /**
   * Count Type EventCountOutputType
   */

  export type EventCountOutputType = {
    eventUsers: number
    sections: number
  }

  export type EventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eventUsers?: boolean | EventCountOutputTypeCountEventUsersArgs
    sections?: boolean | EventCountOutputTypeCountSectionsArgs
  }

  // Custom InputTypes
  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: EventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountEventUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventUserListWhereInput
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountSectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventSectionWhereInput
  }


  /**
   * Count Type EventSectionCountOutputType
   */

  export type EventSectionCountOutputType = {
    files: number
  }

  export type EventSectionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    files?: boolean | EventSectionCountOutputTypeCountFilesArgs
  }

  // Custom InputTypes
  /**
   * EventSectionCountOutputType without action
   */
  export type EventSectionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSectionCountOutputType
     */
    select?: EventSectionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventSectionCountOutputType without action
   */
  export type EventSectionCountOutputTypeCountFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectionFileWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    supervisorCount: number | null
    managerCount: number | null
    logisticCount: number | null
    driverCount: number | null
    dispatchCount: number | null
    assistantManagerCount: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    supervisorCount: number | null
    managerCount: number | null
    logisticCount: number | null
    driverCount: number | null
    dispatchCount: number | null
    assistantManagerCount: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    level: $Enums.UserLevel | null
    name: string | null
    email: string | null
    password: string | null
    birthday: Date | null
    hireDate: Date | null
    phone: string | null
    active: boolean | null
    guardCard: boolean | null
    supervisorCount: number | null
    managerCount: number | null
    logisticCount: number | null
    driverCount: number | null
    dispatchCount: number | null
    assistantManagerCount: number | null
    contactName: string | null
    contactPhone: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    level: $Enums.UserLevel | null
    name: string | null
    email: string | null
    password: string | null
    birthday: Date | null
    hireDate: Date | null
    phone: string | null
    active: boolean | null
    guardCard: boolean | null
    supervisorCount: number | null
    managerCount: number | null
    logisticCount: number | null
    driverCount: number | null
    dispatchCount: number | null
    assistantManagerCount: number | null
    contactName: string | null
    contactPhone: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    level: number
    name: number
    email: number
    password: number
    birthday: number
    hireDate: number
    phone: number
    active: number
    guardCard: number
    supervisorCount: number
    managerCount: number
    logisticCount: number
    driverCount: number
    dispatchCount: number
    assistantManagerCount: number
    contactName: number
    contactPhone: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    supervisorCount?: true
    managerCount?: true
    logisticCount?: true
    driverCount?: true
    dispatchCount?: true
    assistantManagerCount?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    supervisorCount?: true
    managerCount?: true
    logisticCount?: true
    driverCount?: true
    dispatchCount?: true
    assistantManagerCount?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    level?: true
    name?: true
    email?: true
    password?: true
    birthday?: true
    hireDate?: true
    phone?: true
    active?: true
    guardCard?: true
    supervisorCount?: true
    managerCount?: true
    logisticCount?: true
    driverCount?: true
    dispatchCount?: true
    assistantManagerCount?: true
    contactName?: true
    contactPhone?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    level?: true
    name?: true
    email?: true
    password?: true
    birthday?: true
    hireDate?: true
    phone?: true
    active?: true
    guardCard?: true
    supervisorCount?: true
    managerCount?: true
    logisticCount?: true
    driverCount?: true
    dispatchCount?: true
    assistantManagerCount?: true
    contactName?: true
    contactPhone?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    level?: true
    name?: true
    email?: true
    password?: true
    birthday?: true
    hireDate?: true
    phone?: true
    active?: true
    guardCard?: true
    supervisorCount?: true
    managerCount?: true
    logisticCount?: true
    driverCount?: true
    dispatchCount?: true
    assistantManagerCount?: true
    contactName?: true
    contactPhone?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    level: $Enums.UserLevel
    name: string
    email: string
    password: string
    birthday: Date
    hireDate: Date
    phone: string
    active: boolean
    guardCard: boolean
    supervisorCount: number
    managerCount: number
    logisticCount: number
    driverCount: number
    dispatchCount: number
    assistantManagerCount: number
    contactName: string | null
    contactPhone: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    level?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    birthday?: boolean
    hireDate?: boolean
    phone?: boolean
    active?: boolean
    guardCard?: boolean
    supervisorCount?: boolean
    managerCount?: boolean
    logisticCount?: boolean
    driverCount?: boolean
    dispatchCount?: boolean
    assistantManagerCount?: boolean
    contactName?: boolean
    contactPhone?: boolean
    eventUserList?: boolean | User$eventUserListArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    level?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    birthday?: boolean
    hireDate?: boolean
    phone?: boolean
    active?: boolean
    guardCard?: boolean
    supervisorCount?: boolean
    managerCount?: boolean
    logisticCount?: boolean
    driverCount?: boolean
    dispatchCount?: boolean
    assistantManagerCount?: boolean
    contactName?: boolean
    contactPhone?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    level?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    birthday?: boolean
    hireDate?: boolean
    phone?: boolean
    active?: boolean
    guardCard?: boolean
    supervisorCount?: boolean
    managerCount?: boolean
    logisticCount?: boolean
    driverCount?: boolean
    dispatchCount?: boolean
    assistantManagerCount?: boolean
    contactName?: boolean
    contactPhone?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    level?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    birthday?: boolean
    hireDate?: boolean
    phone?: boolean
    active?: boolean
    guardCard?: boolean
    supervisorCount?: boolean
    managerCount?: boolean
    logisticCount?: boolean
    driverCount?: boolean
    dispatchCount?: boolean
    assistantManagerCount?: boolean
    contactName?: boolean
    contactPhone?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "level" | "name" | "email" | "password" | "birthday" | "hireDate" | "phone" | "active" | "guardCard" | "supervisorCount" | "managerCount" | "logisticCount" | "driverCount" | "dispatchCount" | "assistantManagerCount" | "contactName" | "contactPhone", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eventUserList?: boolean | User$eventUserListArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      eventUserList: Prisma.$EventUserListPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      level: $Enums.UserLevel
      name: string
      email: string
      password: string
      birthday: Date
      hireDate: Date
      phone: string
      active: boolean
      guardCard: boolean
      supervisorCount: number
      managerCount: number
      logisticCount: number
      driverCount: number
      dispatchCount: number
      assistantManagerCount: number
      contactName: string | null
      contactPhone: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    eventUserList<T extends User$eventUserListArgs<ExtArgs> = {}>(args?: Subset<T, User$eventUserListArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventUserListPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly level: FieldRef<"User", 'UserLevel'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly birthday: FieldRef<"User", 'DateTime'>
    readonly hireDate: FieldRef<"User", 'DateTime'>
    readonly phone: FieldRef<"User", 'String'>
    readonly active: FieldRef<"User", 'Boolean'>
    readonly guardCard: FieldRef<"User", 'Boolean'>
    readonly supervisorCount: FieldRef<"User", 'Int'>
    readonly managerCount: FieldRef<"User", 'Int'>
    readonly logisticCount: FieldRef<"User", 'Int'>
    readonly driverCount: FieldRef<"User", 'Int'>
    readonly dispatchCount: FieldRef<"User", 'Int'>
    readonly assistantManagerCount: FieldRef<"User", 'Int'>
    readonly contactName: FieldRef<"User", 'String'>
    readonly contactPhone: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.eventUserList
   */
  export type User$eventUserListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventUserList
     */
    select?: EventUserListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventUserList
     */
    omit?: EventUserListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventUserListInclude<ExtArgs> | null
    where?: EventUserListWhereInput
    orderBy?: EventUserListOrderByWithRelationInput | EventUserListOrderByWithRelationInput[]
    cursor?: EventUserListWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventUserListScalarFieldEnum | EventUserListScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventAvgAggregateOutputType = {
    id: number | null
    internalNumber: number | null
    externalNumber: number | null
    maxUsers: number | null
  }

  export type EventSumAggregateOutputType = {
    id: number | null
    internalNumber: number | null
    externalNumber: number | null
    maxUsers: number | null
  }

  export type EventMinAggregateOutputType = {
    id: number | null
    name: string | null
    city: string | null
    state: $Enums.USAState | null
    zipCode: string | null
    street: string | null
    internalNumber: number | null
    externalNumber: number | null
    startDate: Date | null
    endDate: Date | null
    public: boolean | null
    done: boolean | null
    maxUsers: number | null
  }

  export type EventMaxAggregateOutputType = {
    id: number | null
    name: string | null
    city: string | null
    state: $Enums.USAState | null
    zipCode: string | null
    street: string | null
    internalNumber: number | null
    externalNumber: number | null
    startDate: Date | null
    endDate: Date | null
    public: boolean | null
    done: boolean | null
    maxUsers: number | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    name: number
    city: number
    state: number
    zipCode: number
    street: number
    internalNumber: number
    externalNumber: number
    startDate: number
    endDate: number
    public: number
    done: number
    maxUsers: number
    _all: number
  }


  export type EventAvgAggregateInputType = {
    id?: true
    internalNumber?: true
    externalNumber?: true
    maxUsers?: true
  }

  export type EventSumAggregateInputType = {
    id?: true
    internalNumber?: true
    externalNumber?: true
    maxUsers?: true
  }

  export type EventMinAggregateInputType = {
    id?: true
    name?: true
    city?: true
    state?: true
    zipCode?: true
    street?: true
    internalNumber?: true
    externalNumber?: true
    startDate?: true
    endDate?: true
    public?: true
    done?: true
    maxUsers?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    name?: true
    city?: true
    state?: true
    zipCode?: true
    street?: true
    internalNumber?: true
    externalNumber?: true
    startDate?: true
    endDate?: true
    public?: true
    done?: true
    maxUsers?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    name?: true
    city?: true
    state?: true
    zipCode?: true
    street?: true
    internalNumber?: true
    externalNumber?: true
    startDate?: true
    endDate?: true
    public?: true
    done?: true
    maxUsers?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _avg?: EventAvgAggregateInputType
    _sum?: EventSumAggregateInputType
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id: number
    name: string
    city: string
    state: $Enums.USAState
    zipCode: string
    street: string
    internalNumber: number | null
    externalNumber: number | null
    startDate: Date
    endDate: Date
    public: boolean
    done: boolean
    maxUsers: number
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    street?: boolean
    internalNumber?: boolean
    externalNumber?: boolean
    startDate?: boolean
    endDate?: boolean
    public?: boolean
    done?: boolean
    maxUsers?: boolean
    eventUsers?: boolean | Event$eventUsersArgs<ExtArgs>
    sections?: boolean | Event$sectionsArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    street?: boolean
    internalNumber?: boolean
    externalNumber?: boolean
    startDate?: boolean
    endDate?: boolean
    public?: boolean
    done?: boolean
    maxUsers?: boolean
  }, ExtArgs["result"]["event"]>

  export type EventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    street?: boolean
    internalNumber?: boolean
    externalNumber?: boolean
    startDate?: boolean
    endDate?: boolean
    public?: boolean
    done?: boolean
    maxUsers?: boolean
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    id?: boolean
    name?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    street?: boolean
    internalNumber?: boolean
    externalNumber?: boolean
    startDate?: boolean
    endDate?: boolean
    public?: boolean
    done?: boolean
    maxUsers?: boolean
  }

  export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "city" | "state" | "zipCode" | "street" | "internalNumber" | "externalNumber" | "startDate" | "endDate" | "public" | "done" | "maxUsers", ExtArgs["result"]["event"]>
  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eventUsers?: boolean | Event$eventUsersArgs<ExtArgs>
    sections?: boolean | Event$sectionsArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      eventUsers: Prisma.$EventUserListPayload<ExtArgs>[]
      sections: Prisma.$EventSectionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      city: string
      state: $Enums.USAState
      zipCode: string
      street: string
      internalNumber: number | null
      externalNumber: number | null
      startDate: Date
      endDate: Date
      public: boolean
      done: boolean
      maxUsers: number
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events and returns the data updated in the database.
     * @param {EventUpdateManyAndReturnArgs} args - Arguments to update many Events.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.updateManyAndReturn({
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
    updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(args: SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
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
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    eventUsers<T extends Event$eventUsersArgs<ExtArgs> = {}>(args?: Subset<T, Event$eventUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventUserListPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sections<T extends Event$sectionsArgs<ExtArgs> = {}>(args?: Subset<T, Event$sectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventSectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Event model
   */
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'Int'>
    readonly name: FieldRef<"Event", 'String'>
    readonly city: FieldRef<"Event", 'String'>
    readonly state: FieldRef<"Event", 'USAState'>
    readonly zipCode: FieldRef<"Event", 'String'>
    readonly street: FieldRef<"Event", 'String'>
    readonly internalNumber: FieldRef<"Event", 'Int'>
    readonly externalNumber: FieldRef<"Event", 'Int'>
    readonly startDate: FieldRef<"Event", 'DateTime'>
    readonly endDate: FieldRef<"Event", 'DateTime'>
    readonly public: FieldRef<"Event", 'Boolean'>
    readonly done: FieldRef<"Event", 'Boolean'>
    readonly maxUsers: FieldRef<"Event", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event updateManyAndReturn
   */
  export type EventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to delete.
     */
    limit?: number
  }

  /**
   * Event.eventUsers
   */
  export type Event$eventUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventUserList
     */
    select?: EventUserListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventUserList
     */
    omit?: EventUserListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventUserListInclude<ExtArgs> | null
    where?: EventUserListWhereInput
    orderBy?: EventUserListOrderByWithRelationInput | EventUserListOrderByWithRelationInput[]
    cursor?: EventUserListWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventUserListScalarFieldEnum | EventUserListScalarFieldEnum[]
  }

  /**
   * Event.sections
   */
  export type Event$sectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSection
     */
    select?: EventSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventSection
     */
    omit?: EventSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSectionInclude<ExtArgs> | null
    where?: EventSectionWhereInput
    orderBy?: EventSectionOrderByWithRelationInput | EventSectionOrderByWithRelationInput[]
    cursor?: EventSectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventSectionScalarFieldEnum | EventSectionScalarFieldEnum[]
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
  }


  /**
   * Model EventSection
   */

  export type AggregateEventSection = {
    _count: EventSectionCountAggregateOutputType | null
    _avg: EventSectionAvgAggregateOutputType | null
    _sum: EventSectionSumAggregateOutputType | null
    _min: EventSectionMinAggregateOutputType | null
    _max: EventSectionMaxAggregateOutputType | null
  }

  export type EventSectionAvgAggregateOutputType = {
    id: number | null
    eventId: number | null
  }

  export type EventSectionSumAggregateOutputType = {
    id: number | null
    eventId: number | null
  }

  export type EventSectionMinAggregateOutputType = {
    id: number | null
    eventId: number | null
    sectionName: string | null
    description: string | null
  }

  export type EventSectionMaxAggregateOutputType = {
    id: number | null
    eventId: number | null
    sectionName: string | null
    description: string | null
  }

  export type EventSectionCountAggregateOutputType = {
    id: number
    eventId: number
    sectionName: number
    description: number
    _all: number
  }


  export type EventSectionAvgAggregateInputType = {
    id?: true
    eventId?: true
  }

  export type EventSectionSumAggregateInputType = {
    id?: true
    eventId?: true
  }

  export type EventSectionMinAggregateInputType = {
    id?: true
    eventId?: true
    sectionName?: true
    description?: true
  }

  export type EventSectionMaxAggregateInputType = {
    id?: true
    eventId?: true
    sectionName?: true
    description?: true
  }

  export type EventSectionCountAggregateInputType = {
    id?: true
    eventId?: true
    sectionName?: true
    description?: true
    _all?: true
  }

  export type EventSectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventSection to aggregate.
     */
    where?: EventSectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventSections to fetch.
     */
    orderBy?: EventSectionOrderByWithRelationInput | EventSectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventSectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventSections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventSections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventSections
    **/
    _count?: true | EventSectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventSectionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventSectionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventSectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventSectionMaxAggregateInputType
  }

  export type GetEventSectionAggregateType<T extends EventSectionAggregateArgs> = {
        [P in keyof T & keyof AggregateEventSection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventSection[P]>
      : GetScalarType<T[P], AggregateEventSection[P]>
  }




  export type EventSectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventSectionWhereInput
    orderBy?: EventSectionOrderByWithAggregationInput | EventSectionOrderByWithAggregationInput[]
    by: EventSectionScalarFieldEnum[] | EventSectionScalarFieldEnum
    having?: EventSectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventSectionCountAggregateInputType | true
    _avg?: EventSectionAvgAggregateInputType
    _sum?: EventSectionSumAggregateInputType
    _min?: EventSectionMinAggregateInputType
    _max?: EventSectionMaxAggregateInputType
  }

  export type EventSectionGroupByOutputType = {
    id: number
    eventId: number
    sectionName: string
    description: string | null
    _count: EventSectionCountAggregateOutputType | null
    _avg: EventSectionAvgAggregateOutputType | null
    _sum: EventSectionSumAggregateOutputType | null
    _min: EventSectionMinAggregateOutputType | null
    _max: EventSectionMaxAggregateOutputType | null
  }

  type GetEventSectionGroupByPayload<T extends EventSectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventSectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventSectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventSectionGroupByOutputType[P]>
            : GetScalarType<T[P], EventSectionGroupByOutputType[P]>
        }
      >
    >


  export type EventSectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    sectionName?: boolean
    description?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    files?: boolean | EventSection$filesArgs<ExtArgs>
    _count?: boolean | EventSectionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventSection"]>

  export type EventSectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    sectionName?: boolean
    description?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventSection"]>

  export type EventSectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    sectionName?: boolean
    description?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventSection"]>

  export type EventSectionSelectScalar = {
    id?: boolean
    eventId?: boolean
    sectionName?: boolean
    description?: boolean
  }

  export type EventSectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "eventId" | "sectionName" | "description", ExtArgs["result"]["eventSection"]>
  export type EventSectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    files?: boolean | EventSection$filesArgs<ExtArgs>
    _count?: boolean | EventSectionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventSectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type EventSectionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }

  export type $EventSectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EventSection"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
      files: Prisma.$SectionFilePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      eventId: number
      sectionName: string
      description: string | null
    }, ExtArgs["result"]["eventSection"]>
    composites: {}
  }

  type EventSectionGetPayload<S extends boolean | null | undefined | EventSectionDefaultArgs> = $Result.GetResult<Prisma.$EventSectionPayload, S>

  type EventSectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventSectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventSectionCountAggregateInputType | true
    }

  export interface EventSectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EventSection'], meta: { name: 'EventSection' } }
    /**
     * Find zero or one EventSection that matches the filter.
     * @param {EventSectionFindUniqueArgs} args - Arguments to find a EventSection
     * @example
     * // Get one EventSection
     * const eventSection = await prisma.eventSection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventSectionFindUniqueArgs>(args: SelectSubset<T, EventSectionFindUniqueArgs<ExtArgs>>): Prisma__EventSectionClient<$Result.GetResult<Prisma.$EventSectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EventSection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventSectionFindUniqueOrThrowArgs} args - Arguments to find a EventSection
     * @example
     * // Get one EventSection
     * const eventSection = await prisma.eventSection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventSectionFindUniqueOrThrowArgs>(args: SelectSubset<T, EventSectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventSectionClient<$Result.GetResult<Prisma.$EventSectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventSection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventSectionFindFirstArgs} args - Arguments to find a EventSection
     * @example
     * // Get one EventSection
     * const eventSection = await prisma.eventSection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventSectionFindFirstArgs>(args?: SelectSubset<T, EventSectionFindFirstArgs<ExtArgs>>): Prisma__EventSectionClient<$Result.GetResult<Prisma.$EventSectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventSection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventSectionFindFirstOrThrowArgs} args - Arguments to find a EventSection
     * @example
     * // Get one EventSection
     * const eventSection = await prisma.eventSection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventSectionFindFirstOrThrowArgs>(args?: SelectSubset<T, EventSectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventSectionClient<$Result.GetResult<Prisma.$EventSectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EventSections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventSectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventSections
     * const eventSections = await prisma.eventSection.findMany()
     * 
     * // Get first 10 EventSections
     * const eventSections = await prisma.eventSection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventSectionWithIdOnly = await prisma.eventSection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventSectionFindManyArgs>(args?: SelectSubset<T, EventSectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventSectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EventSection.
     * @param {EventSectionCreateArgs} args - Arguments to create a EventSection.
     * @example
     * // Create one EventSection
     * const EventSection = await prisma.eventSection.create({
     *   data: {
     *     // ... data to create a EventSection
     *   }
     * })
     * 
     */
    create<T extends EventSectionCreateArgs>(args: SelectSubset<T, EventSectionCreateArgs<ExtArgs>>): Prisma__EventSectionClient<$Result.GetResult<Prisma.$EventSectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EventSections.
     * @param {EventSectionCreateManyArgs} args - Arguments to create many EventSections.
     * @example
     * // Create many EventSections
     * const eventSection = await prisma.eventSection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventSectionCreateManyArgs>(args?: SelectSubset<T, EventSectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EventSections and returns the data saved in the database.
     * @param {EventSectionCreateManyAndReturnArgs} args - Arguments to create many EventSections.
     * @example
     * // Create many EventSections
     * const eventSection = await prisma.eventSection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EventSections and only return the `id`
     * const eventSectionWithIdOnly = await prisma.eventSection.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventSectionCreateManyAndReturnArgs>(args?: SelectSubset<T, EventSectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventSectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EventSection.
     * @param {EventSectionDeleteArgs} args - Arguments to delete one EventSection.
     * @example
     * // Delete one EventSection
     * const EventSection = await prisma.eventSection.delete({
     *   where: {
     *     // ... filter to delete one EventSection
     *   }
     * })
     * 
     */
    delete<T extends EventSectionDeleteArgs>(args: SelectSubset<T, EventSectionDeleteArgs<ExtArgs>>): Prisma__EventSectionClient<$Result.GetResult<Prisma.$EventSectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EventSection.
     * @param {EventSectionUpdateArgs} args - Arguments to update one EventSection.
     * @example
     * // Update one EventSection
     * const eventSection = await prisma.eventSection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventSectionUpdateArgs>(args: SelectSubset<T, EventSectionUpdateArgs<ExtArgs>>): Prisma__EventSectionClient<$Result.GetResult<Prisma.$EventSectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EventSections.
     * @param {EventSectionDeleteManyArgs} args - Arguments to filter EventSections to delete.
     * @example
     * // Delete a few EventSections
     * const { count } = await prisma.eventSection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventSectionDeleteManyArgs>(args?: SelectSubset<T, EventSectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventSections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventSectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventSections
     * const eventSection = await prisma.eventSection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventSectionUpdateManyArgs>(args: SelectSubset<T, EventSectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventSections and returns the data updated in the database.
     * @param {EventSectionUpdateManyAndReturnArgs} args - Arguments to update many EventSections.
     * @example
     * // Update many EventSections
     * const eventSection = await prisma.eventSection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EventSections and only return the `id`
     * const eventSectionWithIdOnly = await prisma.eventSection.updateManyAndReturn({
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
    updateManyAndReturn<T extends EventSectionUpdateManyAndReturnArgs>(args: SelectSubset<T, EventSectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventSectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EventSection.
     * @param {EventSectionUpsertArgs} args - Arguments to update or create a EventSection.
     * @example
     * // Update or create a EventSection
     * const eventSection = await prisma.eventSection.upsert({
     *   create: {
     *     // ... data to create a EventSection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventSection we want to update
     *   }
     * })
     */
    upsert<T extends EventSectionUpsertArgs>(args: SelectSubset<T, EventSectionUpsertArgs<ExtArgs>>): Prisma__EventSectionClient<$Result.GetResult<Prisma.$EventSectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EventSections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventSectionCountArgs} args - Arguments to filter EventSections to count.
     * @example
     * // Count the number of EventSections
     * const count = await prisma.eventSection.count({
     *   where: {
     *     // ... the filter for the EventSections we want to count
     *   }
     * })
    **/
    count<T extends EventSectionCountArgs>(
      args?: Subset<T, EventSectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventSectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventSection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventSectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EventSectionAggregateArgs>(args: Subset<T, EventSectionAggregateArgs>): Prisma.PrismaPromise<GetEventSectionAggregateType<T>>

    /**
     * Group by EventSection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventSectionGroupByArgs} args - Group by arguments.
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
      T extends EventSectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventSectionGroupByArgs['orderBy'] }
        : { orderBy?: EventSectionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EventSectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventSectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EventSection model
   */
  readonly fields: EventSectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventSection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventSectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    files<T extends EventSection$filesArgs<ExtArgs> = {}>(args?: Subset<T, EventSection$filesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the EventSection model
   */
  interface EventSectionFieldRefs {
    readonly id: FieldRef<"EventSection", 'Int'>
    readonly eventId: FieldRef<"EventSection", 'Int'>
    readonly sectionName: FieldRef<"EventSection", 'String'>
    readonly description: FieldRef<"EventSection", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EventSection findUnique
   */
  export type EventSectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSection
     */
    select?: EventSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventSection
     */
    omit?: EventSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSectionInclude<ExtArgs> | null
    /**
     * Filter, which EventSection to fetch.
     */
    where: EventSectionWhereUniqueInput
  }

  /**
   * EventSection findUniqueOrThrow
   */
  export type EventSectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSection
     */
    select?: EventSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventSection
     */
    omit?: EventSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSectionInclude<ExtArgs> | null
    /**
     * Filter, which EventSection to fetch.
     */
    where: EventSectionWhereUniqueInput
  }

  /**
   * EventSection findFirst
   */
  export type EventSectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSection
     */
    select?: EventSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventSection
     */
    omit?: EventSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSectionInclude<ExtArgs> | null
    /**
     * Filter, which EventSection to fetch.
     */
    where?: EventSectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventSections to fetch.
     */
    orderBy?: EventSectionOrderByWithRelationInput | EventSectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventSections.
     */
    cursor?: EventSectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventSections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventSections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventSections.
     */
    distinct?: EventSectionScalarFieldEnum | EventSectionScalarFieldEnum[]
  }

  /**
   * EventSection findFirstOrThrow
   */
  export type EventSectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSection
     */
    select?: EventSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventSection
     */
    omit?: EventSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSectionInclude<ExtArgs> | null
    /**
     * Filter, which EventSection to fetch.
     */
    where?: EventSectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventSections to fetch.
     */
    orderBy?: EventSectionOrderByWithRelationInput | EventSectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventSections.
     */
    cursor?: EventSectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventSections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventSections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventSections.
     */
    distinct?: EventSectionScalarFieldEnum | EventSectionScalarFieldEnum[]
  }

  /**
   * EventSection findMany
   */
  export type EventSectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSection
     */
    select?: EventSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventSection
     */
    omit?: EventSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSectionInclude<ExtArgs> | null
    /**
     * Filter, which EventSections to fetch.
     */
    where?: EventSectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventSections to fetch.
     */
    orderBy?: EventSectionOrderByWithRelationInput | EventSectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventSections.
     */
    cursor?: EventSectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventSections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventSections.
     */
    skip?: number
    distinct?: EventSectionScalarFieldEnum | EventSectionScalarFieldEnum[]
  }

  /**
   * EventSection create
   */
  export type EventSectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSection
     */
    select?: EventSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventSection
     */
    omit?: EventSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSectionInclude<ExtArgs> | null
    /**
     * The data needed to create a EventSection.
     */
    data: XOR<EventSectionCreateInput, EventSectionUncheckedCreateInput>
  }

  /**
   * EventSection createMany
   */
  export type EventSectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EventSections.
     */
    data: EventSectionCreateManyInput | EventSectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventSection createManyAndReturn
   */
  export type EventSectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSection
     */
    select?: EventSectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventSection
     */
    omit?: EventSectionOmit<ExtArgs> | null
    /**
     * The data used to create many EventSections.
     */
    data: EventSectionCreateManyInput | EventSectionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSectionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventSection update
   */
  export type EventSectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSection
     */
    select?: EventSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventSection
     */
    omit?: EventSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSectionInclude<ExtArgs> | null
    /**
     * The data needed to update a EventSection.
     */
    data: XOR<EventSectionUpdateInput, EventSectionUncheckedUpdateInput>
    /**
     * Choose, which EventSection to update.
     */
    where: EventSectionWhereUniqueInput
  }

  /**
   * EventSection updateMany
   */
  export type EventSectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EventSections.
     */
    data: XOR<EventSectionUpdateManyMutationInput, EventSectionUncheckedUpdateManyInput>
    /**
     * Filter which EventSections to update
     */
    where?: EventSectionWhereInput
    /**
     * Limit how many EventSections to update.
     */
    limit?: number
  }

  /**
   * EventSection updateManyAndReturn
   */
  export type EventSectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSection
     */
    select?: EventSectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventSection
     */
    omit?: EventSectionOmit<ExtArgs> | null
    /**
     * The data used to update EventSections.
     */
    data: XOR<EventSectionUpdateManyMutationInput, EventSectionUncheckedUpdateManyInput>
    /**
     * Filter which EventSections to update
     */
    where?: EventSectionWhereInput
    /**
     * Limit how many EventSections to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSectionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventSection upsert
   */
  export type EventSectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSection
     */
    select?: EventSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventSection
     */
    omit?: EventSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSectionInclude<ExtArgs> | null
    /**
     * The filter to search for the EventSection to update in case it exists.
     */
    where: EventSectionWhereUniqueInput
    /**
     * In case the EventSection found by the `where` argument doesn't exist, create a new EventSection with this data.
     */
    create: XOR<EventSectionCreateInput, EventSectionUncheckedCreateInput>
    /**
     * In case the EventSection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventSectionUpdateInput, EventSectionUncheckedUpdateInput>
  }

  /**
   * EventSection delete
   */
  export type EventSectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSection
     */
    select?: EventSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventSection
     */
    omit?: EventSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSectionInclude<ExtArgs> | null
    /**
     * Filter which EventSection to delete.
     */
    where: EventSectionWhereUniqueInput
  }

  /**
   * EventSection deleteMany
   */
  export type EventSectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventSections to delete
     */
    where?: EventSectionWhereInput
    /**
     * Limit how many EventSections to delete.
     */
    limit?: number
  }

  /**
   * EventSection.files
   */
  export type EventSection$filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionFile
     */
    select?: SectionFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionFile
     */
    omit?: SectionFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionFileInclude<ExtArgs> | null
    where?: SectionFileWhereInput
    orderBy?: SectionFileOrderByWithRelationInput | SectionFileOrderByWithRelationInput[]
    cursor?: SectionFileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SectionFileScalarFieldEnum | SectionFileScalarFieldEnum[]
  }

  /**
   * EventSection without action
   */
  export type EventSectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventSection
     */
    select?: EventSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventSection
     */
    omit?: EventSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventSectionInclude<ExtArgs> | null
  }


  /**
   * Model SectionFile
   */

  export type AggregateSectionFile = {
    _count: SectionFileCountAggregateOutputType | null
    _avg: SectionFileAvgAggregateOutputType | null
    _sum: SectionFileSumAggregateOutputType | null
    _min: SectionFileMinAggregateOutputType | null
    _max: SectionFileMaxAggregateOutputType | null
  }

  export type SectionFileAvgAggregateOutputType = {
    id: number | null
    sectionId: number | null
  }

  export type SectionFileSumAggregateOutputType = {
    id: number | null
    sectionId: number | null
  }

  export type SectionFileMinAggregateOutputType = {
    id: number | null
    sectionId: number | null
    name: string | null
    dataBytes: Uint8Array | null
  }

  export type SectionFileMaxAggregateOutputType = {
    id: number | null
    sectionId: number | null
    name: string | null
    dataBytes: Uint8Array | null
  }

  export type SectionFileCountAggregateOutputType = {
    id: number
    sectionId: number
    name: number
    dataBytes: number
    _all: number
  }


  export type SectionFileAvgAggregateInputType = {
    id?: true
    sectionId?: true
  }

  export type SectionFileSumAggregateInputType = {
    id?: true
    sectionId?: true
  }

  export type SectionFileMinAggregateInputType = {
    id?: true
    sectionId?: true
    name?: true
    dataBytes?: true
  }

  export type SectionFileMaxAggregateInputType = {
    id?: true
    sectionId?: true
    name?: true
    dataBytes?: true
  }

  export type SectionFileCountAggregateInputType = {
    id?: true
    sectionId?: true
    name?: true
    dataBytes?: true
    _all?: true
  }

  export type SectionFileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SectionFile to aggregate.
     */
    where?: SectionFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SectionFiles to fetch.
     */
    orderBy?: SectionFileOrderByWithRelationInput | SectionFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SectionFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SectionFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SectionFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SectionFiles
    **/
    _count?: true | SectionFileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SectionFileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SectionFileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SectionFileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SectionFileMaxAggregateInputType
  }

  export type GetSectionFileAggregateType<T extends SectionFileAggregateArgs> = {
        [P in keyof T & keyof AggregateSectionFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSectionFile[P]>
      : GetScalarType<T[P], AggregateSectionFile[P]>
  }




  export type SectionFileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectionFileWhereInput
    orderBy?: SectionFileOrderByWithAggregationInput | SectionFileOrderByWithAggregationInput[]
    by: SectionFileScalarFieldEnum[] | SectionFileScalarFieldEnum
    having?: SectionFileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SectionFileCountAggregateInputType | true
    _avg?: SectionFileAvgAggregateInputType
    _sum?: SectionFileSumAggregateInputType
    _min?: SectionFileMinAggregateInputType
    _max?: SectionFileMaxAggregateInputType
  }

  export type SectionFileGroupByOutputType = {
    id: number
    sectionId: number
    name: string
    dataBytes: Uint8Array
    _count: SectionFileCountAggregateOutputType | null
    _avg: SectionFileAvgAggregateOutputType | null
    _sum: SectionFileSumAggregateOutputType | null
    _min: SectionFileMinAggregateOutputType | null
    _max: SectionFileMaxAggregateOutputType | null
  }

  type GetSectionFileGroupByPayload<T extends SectionFileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SectionFileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SectionFileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SectionFileGroupByOutputType[P]>
            : GetScalarType<T[P], SectionFileGroupByOutputType[P]>
        }
      >
    >


  export type SectionFileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sectionId?: boolean
    name?: boolean
    dataBytes?: boolean
    section?: boolean | EventSectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sectionFile"]>

  export type SectionFileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sectionId?: boolean
    name?: boolean
    dataBytes?: boolean
    section?: boolean | EventSectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sectionFile"]>

  export type SectionFileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sectionId?: boolean
    name?: boolean
    dataBytes?: boolean
    section?: boolean | EventSectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sectionFile"]>

  export type SectionFileSelectScalar = {
    id?: boolean
    sectionId?: boolean
    name?: boolean
    dataBytes?: boolean
  }

  export type SectionFileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sectionId" | "name" | "dataBytes", ExtArgs["result"]["sectionFile"]>
  export type SectionFileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    section?: boolean | EventSectionDefaultArgs<ExtArgs>
  }
  export type SectionFileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    section?: boolean | EventSectionDefaultArgs<ExtArgs>
  }
  export type SectionFileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    section?: boolean | EventSectionDefaultArgs<ExtArgs>
  }

  export type $SectionFilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SectionFile"
    objects: {
      section: Prisma.$EventSectionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      sectionId: number
      name: string
      dataBytes: Uint8Array
    }, ExtArgs["result"]["sectionFile"]>
    composites: {}
  }

  type SectionFileGetPayload<S extends boolean | null | undefined | SectionFileDefaultArgs> = $Result.GetResult<Prisma.$SectionFilePayload, S>

  type SectionFileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SectionFileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SectionFileCountAggregateInputType | true
    }

  export interface SectionFileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SectionFile'], meta: { name: 'SectionFile' } }
    /**
     * Find zero or one SectionFile that matches the filter.
     * @param {SectionFileFindUniqueArgs} args - Arguments to find a SectionFile
     * @example
     * // Get one SectionFile
     * const sectionFile = await prisma.sectionFile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SectionFileFindUniqueArgs>(args: SelectSubset<T, SectionFileFindUniqueArgs<ExtArgs>>): Prisma__SectionFileClient<$Result.GetResult<Prisma.$SectionFilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SectionFile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SectionFileFindUniqueOrThrowArgs} args - Arguments to find a SectionFile
     * @example
     * // Get one SectionFile
     * const sectionFile = await prisma.sectionFile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SectionFileFindUniqueOrThrowArgs>(args: SelectSubset<T, SectionFileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SectionFileClient<$Result.GetResult<Prisma.$SectionFilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SectionFile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFileFindFirstArgs} args - Arguments to find a SectionFile
     * @example
     * // Get one SectionFile
     * const sectionFile = await prisma.sectionFile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SectionFileFindFirstArgs>(args?: SelectSubset<T, SectionFileFindFirstArgs<ExtArgs>>): Prisma__SectionFileClient<$Result.GetResult<Prisma.$SectionFilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SectionFile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFileFindFirstOrThrowArgs} args - Arguments to find a SectionFile
     * @example
     * // Get one SectionFile
     * const sectionFile = await prisma.sectionFile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SectionFileFindFirstOrThrowArgs>(args?: SelectSubset<T, SectionFileFindFirstOrThrowArgs<ExtArgs>>): Prisma__SectionFileClient<$Result.GetResult<Prisma.$SectionFilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SectionFiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SectionFiles
     * const sectionFiles = await prisma.sectionFile.findMany()
     * 
     * // Get first 10 SectionFiles
     * const sectionFiles = await prisma.sectionFile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sectionFileWithIdOnly = await prisma.sectionFile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SectionFileFindManyArgs>(args?: SelectSubset<T, SectionFileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SectionFile.
     * @param {SectionFileCreateArgs} args - Arguments to create a SectionFile.
     * @example
     * // Create one SectionFile
     * const SectionFile = await prisma.sectionFile.create({
     *   data: {
     *     // ... data to create a SectionFile
     *   }
     * })
     * 
     */
    create<T extends SectionFileCreateArgs>(args: SelectSubset<T, SectionFileCreateArgs<ExtArgs>>): Prisma__SectionFileClient<$Result.GetResult<Prisma.$SectionFilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SectionFiles.
     * @param {SectionFileCreateManyArgs} args - Arguments to create many SectionFiles.
     * @example
     * // Create many SectionFiles
     * const sectionFile = await prisma.sectionFile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SectionFileCreateManyArgs>(args?: SelectSubset<T, SectionFileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SectionFiles and returns the data saved in the database.
     * @param {SectionFileCreateManyAndReturnArgs} args - Arguments to create many SectionFiles.
     * @example
     * // Create many SectionFiles
     * const sectionFile = await prisma.sectionFile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SectionFiles and only return the `id`
     * const sectionFileWithIdOnly = await prisma.sectionFile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SectionFileCreateManyAndReturnArgs>(args?: SelectSubset<T, SectionFileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionFilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SectionFile.
     * @param {SectionFileDeleteArgs} args - Arguments to delete one SectionFile.
     * @example
     * // Delete one SectionFile
     * const SectionFile = await prisma.sectionFile.delete({
     *   where: {
     *     // ... filter to delete one SectionFile
     *   }
     * })
     * 
     */
    delete<T extends SectionFileDeleteArgs>(args: SelectSubset<T, SectionFileDeleteArgs<ExtArgs>>): Prisma__SectionFileClient<$Result.GetResult<Prisma.$SectionFilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SectionFile.
     * @param {SectionFileUpdateArgs} args - Arguments to update one SectionFile.
     * @example
     * // Update one SectionFile
     * const sectionFile = await prisma.sectionFile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SectionFileUpdateArgs>(args: SelectSubset<T, SectionFileUpdateArgs<ExtArgs>>): Prisma__SectionFileClient<$Result.GetResult<Prisma.$SectionFilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SectionFiles.
     * @param {SectionFileDeleteManyArgs} args - Arguments to filter SectionFiles to delete.
     * @example
     * // Delete a few SectionFiles
     * const { count } = await prisma.sectionFile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SectionFileDeleteManyArgs>(args?: SelectSubset<T, SectionFileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SectionFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SectionFiles
     * const sectionFile = await prisma.sectionFile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SectionFileUpdateManyArgs>(args: SelectSubset<T, SectionFileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SectionFiles and returns the data updated in the database.
     * @param {SectionFileUpdateManyAndReturnArgs} args - Arguments to update many SectionFiles.
     * @example
     * // Update many SectionFiles
     * const sectionFile = await prisma.sectionFile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SectionFiles and only return the `id`
     * const sectionFileWithIdOnly = await prisma.sectionFile.updateManyAndReturn({
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
    updateManyAndReturn<T extends SectionFileUpdateManyAndReturnArgs>(args: SelectSubset<T, SectionFileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionFilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SectionFile.
     * @param {SectionFileUpsertArgs} args - Arguments to update or create a SectionFile.
     * @example
     * // Update or create a SectionFile
     * const sectionFile = await prisma.sectionFile.upsert({
     *   create: {
     *     // ... data to create a SectionFile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SectionFile we want to update
     *   }
     * })
     */
    upsert<T extends SectionFileUpsertArgs>(args: SelectSubset<T, SectionFileUpsertArgs<ExtArgs>>): Prisma__SectionFileClient<$Result.GetResult<Prisma.$SectionFilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SectionFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFileCountArgs} args - Arguments to filter SectionFiles to count.
     * @example
     * // Count the number of SectionFiles
     * const count = await prisma.sectionFile.count({
     *   where: {
     *     // ... the filter for the SectionFiles we want to count
     *   }
     * })
    **/
    count<T extends SectionFileCountArgs>(
      args?: Subset<T, SectionFileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SectionFileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SectionFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SectionFileAggregateArgs>(args: Subset<T, SectionFileAggregateArgs>): Prisma.PrismaPromise<GetSectionFileAggregateType<T>>

    /**
     * Group by SectionFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFileGroupByArgs} args - Group by arguments.
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
      T extends SectionFileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SectionFileGroupByArgs['orderBy'] }
        : { orderBy?: SectionFileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SectionFileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSectionFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SectionFile model
   */
  readonly fields: SectionFileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SectionFile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SectionFileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    section<T extends EventSectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventSectionDefaultArgs<ExtArgs>>): Prisma__EventSectionClient<$Result.GetResult<Prisma.$EventSectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SectionFile model
   */
  interface SectionFileFieldRefs {
    readonly id: FieldRef<"SectionFile", 'Int'>
    readonly sectionId: FieldRef<"SectionFile", 'Int'>
    readonly name: FieldRef<"SectionFile", 'String'>
    readonly dataBytes: FieldRef<"SectionFile", 'Bytes'>
  }
    

  // Custom InputTypes
  /**
   * SectionFile findUnique
   */
  export type SectionFileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionFile
     */
    select?: SectionFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionFile
     */
    omit?: SectionFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionFileInclude<ExtArgs> | null
    /**
     * Filter, which SectionFile to fetch.
     */
    where: SectionFileWhereUniqueInput
  }

  /**
   * SectionFile findUniqueOrThrow
   */
  export type SectionFileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionFile
     */
    select?: SectionFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionFile
     */
    omit?: SectionFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionFileInclude<ExtArgs> | null
    /**
     * Filter, which SectionFile to fetch.
     */
    where: SectionFileWhereUniqueInput
  }

  /**
   * SectionFile findFirst
   */
  export type SectionFileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionFile
     */
    select?: SectionFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionFile
     */
    omit?: SectionFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionFileInclude<ExtArgs> | null
    /**
     * Filter, which SectionFile to fetch.
     */
    where?: SectionFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SectionFiles to fetch.
     */
    orderBy?: SectionFileOrderByWithRelationInput | SectionFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SectionFiles.
     */
    cursor?: SectionFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SectionFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SectionFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SectionFiles.
     */
    distinct?: SectionFileScalarFieldEnum | SectionFileScalarFieldEnum[]
  }

  /**
   * SectionFile findFirstOrThrow
   */
  export type SectionFileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionFile
     */
    select?: SectionFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionFile
     */
    omit?: SectionFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionFileInclude<ExtArgs> | null
    /**
     * Filter, which SectionFile to fetch.
     */
    where?: SectionFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SectionFiles to fetch.
     */
    orderBy?: SectionFileOrderByWithRelationInput | SectionFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SectionFiles.
     */
    cursor?: SectionFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SectionFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SectionFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SectionFiles.
     */
    distinct?: SectionFileScalarFieldEnum | SectionFileScalarFieldEnum[]
  }

  /**
   * SectionFile findMany
   */
  export type SectionFileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionFile
     */
    select?: SectionFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionFile
     */
    omit?: SectionFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionFileInclude<ExtArgs> | null
    /**
     * Filter, which SectionFiles to fetch.
     */
    where?: SectionFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SectionFiles to fetch.
     */
    orderBy?: SectionFileOrderByWithRelationInput | SectionFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SectionFiles.
     */
    cursor?: SectionFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SectionFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SectionFiles.
     */
    skip?: number
    distinct?: SectionFileScalarFieldEnum | SectionFileScalarFieldEnum[]
  }

  /**
   * SectionFile create
   */
  export type SectionFileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionFile
     */
    select?: SectionFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionFile
     */
    omit?: SectionFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionFileInclude<ExtArgs> | null
    /**
     * The data needed to create a SectionFile.
     */
    data: XOR<SectionFileCreateInput, SectionFileUncheckedCreateInput>
  }

  /**
   * SectionFile createMany
   */
  export type SectionFileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SectionFiles.
     */
    data: SectionFileCreateManyInput | SectionFileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SectionFile createManyAndReturn
   */
  export type SectionFileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionFile
     */
    select?: SectionFileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SectionFile
     */
    omit?: SectionFileOmit<ExtArgs> | null
    /**
     * The data used to create many SectionFiles.
     */
    data: SectionFileCreateManyInput | SectionFileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionFileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SectionFile update
   */
  export type SectionFileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionFile
     */
    select?: SectionFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionFile
     */
    omit?: SectionFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionFileInclude<ExtArgs> | null
    /**
     * The data needed to update a SectionFile.
     */
    data: XOR<SectionFileUpdateInput, SectionFileUncheckedUpdateInput>
    /**
     * Choose, which SectionFile to update.
     */
    where: SectionFileWhereUniqueInput
  }

  /**
   * SectionFile updateMany
   */
  export type SectionFileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SectionFiles.
     */
    data: XOR<SectionFileUpdateManyMutationInput, SectionFileUncheckedUpdateManyInput>
    /**
     * Filter which SectionFiles to update
     */
    where?: SectionFileWhereInput
    /**
     * Limit how many SectionFiles to update.
     */
    limit?: number
  }

  /**
   * SectionFile updateManyAndReturn
   */
  export type SectionFileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionFile
     */
    select?: SectionFileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SectionFile
     */
    omit?: SectionFileOmit<ExtArgs> | null
    /**
     * The data used to update SectionFiles.
     */
    data: XOR<SectionFileUpdateManyMutationInput, SectionFileUncheckedUpdateManyInput>
    /**
     * Filter which SectionFiles to update
     */
    where?: SectionFileWhereInput
    /**
     * Limit how many SectionFiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionFileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SectionFile upsert
   */
  export type SectionFileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionFile
     */
    select?: SectionFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionFile
     */
    omit?: SectionFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionFileInclude<ExtArgs> | null
    /**
     * The filter to search for the SectionFile to update in case it exists.
     */
    where: SectionFileWhereUniqueInput
    /**
     * In case the SectionFile found by the `where` argument doesn't exist, create a new SectionFile with this data.
     */
    create: XOR<SectionFileCreateInput, SectionFileUncheckedCreateInput>
    /**
     * In case the SectionFile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SectionFileUpdateInput, SectionFileUncheckedUpdateInput>
  }

  /**
   * SectionFile delete
   */
  export type SectionFileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionFile
     */
    select?: SectionFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionFile
     */
    omit?: SectionFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionFileInclude<ExtArgs> | null
    /**
     * Filter which SectionFile to delete.
     */
    where: SectionFileWhereUniqueInput
  }

  /**
   * SectionFile deleteMany
   */
  export type SectionFileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SectionFiles to delete
     */
    where?: SectionFileWhereInput
    /**
     * Limit how many SectionFiles to delete.
     */
    limit?: number
  }

  /**
   * SectionFile without action
   */
  export type SectionFileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionFile
     */
    select?: SectionFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionFile
     */
    omit?: SectionFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionFileInclude<ExtArgs> | null
  }


  /**
   * Model EventUserList
   */

  export type AggregateEventUserList = {
    _count: EventUserListCountAggregateOutputType | null
    _avg: EventUserListAvgAggregateOutputType | null
    _sum: EventUserListSumAggregateOutputType | null
    _min: EventUserListMinAggregateOutputType | null
    _max: EventUserListMaxAggregateOutputType | null
  }

  export type EventUserListAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    eventId: number | null
  }

  export type EventUserListSumAggregateOutputType = {
    id: number | null
    userId: number | null
    eventId: number | null
  }

  export type EventUserListMinAggregateOutputType = {
    id: number | null
    userId: number | null
    eventId: number | null
    role: $Enums.UserRole | null
  }

  export type EventUserListMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    eventId: number | null
    role: $Enums.UserRole | null
  }

  export type EventUserListCountAggregateOutputType = {
    id: number
    userId: number
    eventId: number
    role: number
    _all: number
  }


  export type EventUserListAvgAggregateInputType = {
    id?: true
    userId?: true
    eventId?: true
  }

  export type EventUserListSumAggregateInputType = {
    id?: true
    userId?: true
    eventId?: true
  }

  export type EventUserListMinAggregateInputType = {
    id?: true
    userId?: true
    eventId?: true
    role?: true
  }

  export type EventUserListMaxAggregateInputType = {
    id?: true
    userId?: true
    eventId?: true
    role?: true
  }

  export type EventUserListCountAggregateInputType = {
    id?: true
    userId?: true
    eventId?: true
    role?: true
    _all?: true
  }

  export type EventUserListAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventUserList to aggregate.
     */
    where?: EventUserListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventUserLists to fetch.
     */
    orderBy?: EventUserListOrderByWithRelationInput | EventUserListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventUserListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventUserLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventUserLists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventUserLists
    **/
    _count?: true | EventUserListCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventUserListAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventUserListSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventUserListMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventUserListMaxAggregateInputType
  }

  export type GetEventUserListAggregateType<T extends EventUserListAggregateArgs> = {
        [P in keyof T & keyof AggregateEventUserList]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventUserList[P]>
      : GetScalarType<T[P], AggregateEventUserList[P]>
  }




  export type EventUserListGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventUserListWhereInput
    orderBy?: EventUserListOrderByWithAggregationInput | EventUserListOrderByWithAggregationInput[]
    by: EventUserListScalarFieldEnum[] | EventUserListScalarFieldEnum
    having?: EventUserListScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventUserListCountAggregateInputType | true
    _avg?: EventUserListAvgAggregateInputType
    _sum?: EventUserListSumAggregateInputType
    _min?: EventUserListMinAggregateInputType
    _max?: EventUserListMaxAggregateInputType
  }

  export type EventUserListGroupByOutputType = {
    id: number
    userId: number
    eventId: number
    role: $Enums.UserRole
    _count: EventUserListCountAggregateOutputType | null
    _avg: EventUserListAvgAggregateOutputType | null
    _sum: EventUserListSumAggregateOutputType | null
    _min: EventUserListMinAggregateOutputType | null
    _max: EventUserListMaxAggregateOutputType | null
  }

  type GetEventUserListGroupByPayload<T extends EventUserListGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventUserListGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventUserListGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventUserListGroupByOutputType[P]>
            : GetScalarType<T[P], EventUserListGroupByOutputType[P]>
        }
      >
    >


  export type EventUserListSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    eventId?: boolean
    role?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventUserList"]>

  export type EventUserListSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    eventId?: boolean
    role?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventUserList"]>

  export type EventUserListSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    eventId?: boolean
    role?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventUserList"]>

  export type EventUserListSelectScalar = {
    id?: boolean
    userId?: boolean
    eventId?: boolean
    role?: boolean
  }

  export type EventUserListOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "eventId" | "role", ExtArgs["result"]["eventUserList"]>
  export type EventUserListInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type EventUserListIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type EventUserListIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }

  export type $EventUserListPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EventUserList"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      event: Prisma.$EventPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      eventId: number
      role: $Enums.UserRole
    }, ExtArgs["result"]["eventUserList"]>
    composites: {}
  }

  type EventUserListGetPayload<S extends boolean | null | undefined | EventUserListDefaultArgs> = $Result.GetResult<Prisma.$EventUserListPayload, S>

  type EventUserListCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventUserListFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventUserListCountAggregateInputType | true
    }

  export interface EventUserListDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EventUserList'], meta: { name: 'EventUserList' } }
    /**
     * Find zero or one EventUserList that matches the filter.
     * @param {EventUserListFindUniqueArgs} args - Arguments to find a EventUserList
     * @example
     * // Get one EventUserList
     * const eventUserList = await prisma.eventUserList.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventUserListFindUniqueArgs>(args: SelectSubset<T, EventUserListFindUniqueArgs<ExtArgs>>): Prisma__EventUserListClient<$Result.GetResult<Prisma.$EventUserListPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EventUserList that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventUserListFindUniqueOrThrowArgs} args - Arguments to find a EventUserList
     * @example
     * // Get one EventUserList
     * const eventUserList = await prisma.eventUserList.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventUserListFindUniqueOrThrowArgs>(args: SelectSubset<T, EventUserListFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventUserListClient<$Result.GetResult<Prisma.$EventUserListPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventUserList that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUserListFindFirstArgs} args - Arguments to find a EventUserList
     * @example
     * // Get one EventUserList
     * const eventUserList = await prisma.eventUserList.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventUserListFindFirstArgs>(args?: SelectSubset<T, EventUserListFindFirstArgs<ExtArgs>>): Prisma__EventUserListClient<$Result.GetResult<Prisma.$EventUserListPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventUserList that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUserListFindFirstOrThrowArgs} args - Arguments to find a EventUserList
     * @example
     * // Get one EventUserList
     * const eventUserList = await prisma.eventUserList.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventUserListFindFirstOrThrowArgs>(args?: SelectSubset<T, EventUserListFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventUserListClient<$Result.GetResult<Prisma.$EventUserListPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EventUserLists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUserListFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventUserLists
     * const eventUserLists = await prisma.eventUserList.findMany()
     * 
     * // Get first 10 EventUserLists
     * const eventUserLists = await prisma.eventUserList.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventUserListWithIdOnly = await prisma.eventUserList.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventUserListFindManyArgs>(args?: SelectSubset<T, EventUserListFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventUserListPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EventUserList.
     * @param {EventUserListCreateArgs} args - Arguments to create a EventUserList.
     * @example
     * // Create one EventUserList
     * const EventUserList = await prisma.eventUserList.create({
     *   data: {
     *     // ... data to create a EventUserList
     *   }
     * })
     * 
     */
    create<T extends EventUserListCreateArgs>(args: SelectSubset<T, EventUserListCreateArgs<ExtArgs>>): Prisma__EventUserListClient<$Result.GetResult<Prisma.$EventUserListPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EventUserLists.
     * @param {EventUserListCreateManyArgs} args - Arguments to create many EventUserLists.
     * @example
     * // Create many EventUserLists
     * const eventUserList = await prisma.eventUserList.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventUserListCreateManyArgs>(args?: SelectSubset<T, EventUserListCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EventUserLists and returns the data saved in the database.
     * @param {EventUserListCreateManyAndReturnArgs} args - Arguments to create many EventUserLists.
     * @example
     * // Create many EventUserLists
     * const eventUserList = await prisma.eventUserList.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EventUserLists and only return the `id`
     * const eventUserListWithIdOnly = await prisma.eventUserList.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventUserListCreateManyAndReturnArgs>(args?: SelectSubset<T, EventUserListCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventUserListPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EventUserList.
     * @param {EventUserListDeleteArgs} args - Arguments to delete one EventUserList.
     * @example
     * // Delete one EventUserList
     * const EventUserList = await prisma.eventUserList.delete({
     *   where: {
     *     // ... filter to delete one EventUserList
     *   }
     * })
     * 
     */
    delete<T extends EventUserListDeleteArgs>(args: SelectSubset<T, EventUserListDeleteArgs<ExtArgs>>): Prisma__EventUserListClient<$Result.GetResult<Prisma.$EventUserListPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EventUserList.
     * @param {EventUserListUpdateArgs} args - Arguments to update one EventUserList.
     * @example
     * // Update one EventUserList
     * const eventUserList = await prisma.eventUserList.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUserListUpdateArgs>(args: SelectSubset<T, EventUserListUpdateArgs<ExtArgs>>): Prisma__EventUserListClient<$Result.GetResult<Prisma.$EventUserListPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EventUserLists.
     * @param {EventUserListDeleteManyArgs} args - Arguments to filter EventUserLists to delete.
     * @example
     * // Delete a few EventUserLists
     * const { count } = await prisma.eventUserList.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventUserListDeleteManyArgs>(args?: SelectSubset<T, EventUserListDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventUserLists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUserListUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventUserLists
     * const eventUserList = await prisma.eventUserList.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUserListUpdateManyArgs>(args: SelectSubset<T, EventUserListUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventUserLists and returns the data updated in the database.
     * @param {EventUserListUpdateManyAndReturnArgs} args - Arguments to update many EventUserLists.
     * @example
     * // Update many EventUserLists
     * const eventUserList = await prisma.eventUserList.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EventUserLists and only return the `id`
     * const eventUserListWithIdOnly = await prisma.eventUserList.updateManyAndReturn({
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
    updateManyAndReturn<T extends EventUserListUpdateManyAndReturnArgs>(args: SelectSubset<T, EventUserListUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventUserListPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EventUserList.
     * @param {EventUserListUpsertArgs} args - Arguments to update or create a EventUserList.
     * @example
     * // Update or create a EventUserList
     * const eventUserList = await prisma.eventUserList.upsert({
     *   create: {
     *     // ... data to create a EventUserList
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventUserList we want to update
     *   }
     * })
     */
    upsert<T extends EventUserListUpsertArgs>(args: SelectSubset<T, EventUserListUpsertArgs<ExtArgs>>): Prisma__EventUserListClient<$Result.GetResult<Prisma.$EventUserListPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EventUserLists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUserListCountArgs} args - Arguments to filter EventUserLists to count.
     * @example
     * // Count the number of EventUserLists
     * const count = await prisma.eventUserList.count({
     *   where: {
     *     // ... the filter for the EventUserLists we want to count
     *   }
     * })
    **/
    count<T extends EventUserListCountArgs>(
      args?: Subset<T, EventUserListCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventUserListCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventUserList.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUserListAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EventUserListAggregateArgs>(args: Subset<T, EventUserListAggregateArgs>): Prisma.PrismaPromise<GetEventUserListAggregateType<T>>

    /**
     * Group by EventUserList.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUserListGroupByArgs} args - Group by arguments.
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
      T extends EventUserListGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventUserListGroupByArgs['orderBy'] }
        : { orderBy?: EventUserListGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EventUserListGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventUserListGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EventUserList model
   */
  readonly fields: EventUserListFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventUserList.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventUserListClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the EventUserList model
   */
  interface EventUserListFieldRefs {
    readonly id: FieldRef<"EventUserList", 'Int'>
    readonly userId: FieldRef<"EventUserList", 'Int'>
    readonly eventId: FieldRef<"EventUserList", 'Int'>
    readonly role: FieldRef<"EventUserList", 'UserRole'>
  }
    

  // Custom InputTypes
  /**
   * EventUserList findUnique
   */
  export type EventUserListFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventUserList
     */
    select?: EventUserListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventUserList
     */
    omit?: EventUserListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventUserListInclude<ExtArgs> | null
    /**
     * Filter, which EventUserList to fetch.
     */
    where: EventUserListWhereUniqueInput
  }

  /**
   * EventUserList findUniqueOrThrow
   */
  export type EventUserListFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventUserList
     */
    select?: EventUserListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventUserList
     */
    omit?: EventUserListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventUserListInclude<ExtArgs> | null
    /**
     * Filter, which EventUserList to fetch.
     */
    where: EventUserListWhereUniqueInput
  }

  /**
   * EventUserList findFirst
   */
  export type EventUserListFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventUserList
     */
    select?: EventUserListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventUserList
     */
    omit?: EventUserListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventUserListInclude<ExtArgs> | null
    /**
     * Filter, which EventUserList to fetch.
     */
    where?: EventUserListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventUserLists to fetch.
     */
    orderBy?: EventUserListOrderByWithRelationInput | EventUserListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventUserLists.
     */
    cursor?: EventUserListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventUserLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventUserLists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventUserLists.
     */
    distinct?: EventUserListScalarFieldEnum | EventUserListScalarFieldEnum[]
  }

  /**
   * EventUserList findFirstOrThrow
   */
  export type EventUserListFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventUserList
     */
    select?: EventUserListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventUserList
     */
    omit?: EventUserListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventUserListInclude<ExtArgs> | null
    /**
     * Filter, which EventUserList to fetch.
     */
    where?: EventUserListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventUserLists to fetch.
     */
    orderBy?: EventUserListOrderByWithRelationInput | EventUserListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventUserLists.
     */
    cursor?: EventUserListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventUserLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventUserLists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventUserLists.
     */
    distinct?: EventUserListScalarFieldEnum | EventUserListScalarFieldEnum[]
  }

  /**
   * EventUserList findMany
   */
  export type EventUserListFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventUserList
     */
    select?: EventUserListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventUserList
     */
    omit?: EventUserListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventUserListInclude<ExtArgs> | null
    /**
     * Filter, which EventUserLists to fetch.
     */
    where?: EventUserListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventUserLists to fetch.
     */
    orderBy?: EventUserListOrderByWithRelationInput | EventUserListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventUserLists.
     */
    cursor?: EventUserListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventUserLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventUserLists.
     */
    skip?: number
    distinct?: EventUserListScalarFieldEnum | EventUserListScalarFieldEnum[]
  }

  /**
   * EventUserList create
   */
  export type EventUserListCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventUserList
     */
    select?: EventUserListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventUserList
     */
    omit?: EventUserListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventUserListInclude<ExtArgs> | null
    /**
     * The data needed to create a EventUserList.
     */
    data: XOR<EventUserListCreateInput, EventUserListUncheckedCreateInput>
  }

  /**
   * EventUserList createMany
   */
  export type EventUserListCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EventUserLists.
     */
    data: EventUserListCreateManyInput | EventUserListCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventUserList createManyAndReturn
   */
  export type EventUserListCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventUserList
     */
    select?: EventUserListSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventUserList
     */
    omit?: EventUserListOmit<ExtArgs> | null
    /**
     * The data used to create many EventUserLists.
     */
    data: EventUserListCreateManyInput | EventUserListCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventUserListIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventUserList update
   */
  export type EventUserListUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventUserList
     */
    select?: EventUserListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventUserList
     */
    omit?: EventUserListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventUserListInclude<ExtArgs> | null
    /**
     * The data needed to update a EventUserList.
     */
    data: XOR<EventUserListUpdateInput, EventUserListUncheckedUpdateInput>
    /**
     * Choose, which EventUserList to update.
     */
    where: EventUserListWhereUniqueInput
  }

  /**
   * EventUserList updateMany
   */
  export type EventUserListUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EventUserLists.
     */
    data: XOR<EventUserListUpdateManyMutationInput, EventUserListUncheckedUpdateManyInput>
    /**
     * Filter which EventUserLists to update
     */
    where?: EventUserListWhereInput
    /**
     * Limit how many EventUserLists to update.
     */
    limit?: number
  }

  /**
   * EventUserList updateManyAndReturn
   */
  export type EventUserListUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventUserList
     */
    select?: EventUserListSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventUserList
     */
    omit?: EventUserListOmit<ExtArgs> | null
    /**
     * The data used to update EventUserLists.
     */
    data: XOR<EventUserListUpdateManyMutationInput, EventUserListUncheckedUpdateManyInput>
    /**
     * Filter which EventUserLists to update
     */
    where?: EventUserListWhereInput
    /**
     * Limit how many EventUserLists to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventUserListIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventUserList upsert
   */
  export type EventUserListUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventUserList
     */
    select?: EventUserListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventUserList
     */
    omit?: EventUserListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventUserListInclude<ExtArgs> | null
    /**
     * The filter to search for the EventUserList to update in case it exists.
     */
    where: EventUserListWhereUniqueInput
    /**
     * In case the EventUserList found by the `where` argument doesn't exist, create a new EventUserList with this data.
     */
    create: XOR<EventUserListCreateInput, EventUserListUncheckedCreateInput>
    /**
     * In case the EventUserList was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUserListUpdateInput, EventUserListUncheckedUpdateInput>
  }

  /**
   * EventUserList delete
   */
  export type EventUserListDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventUserList
     */
    select?: EventUserListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventUserList
     */
    omit?: EventUserListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventUserListInclude<ExtArgs> | null
    /**
     * Filter which EventUserList to delete.
     */
    where: EventUserListWhereUniqueInput
  }

  /**
   * EventUserList deleteMany
   */
  export type EventUserListDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventUserLists to delete
     */
    where?: EventUserListWhereInput
    /**
     * Limit how many EventUserLists to delete.
     */
    limit?: number
  }

  /**
   * EventUserList without action
   */
  export type EventUserListDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventUserList
     */
    select?: EventUserListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventUserList
     */
    omit?: EventUserListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventUserListInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    level: 'level',
    name: 'name',
    email: 'email',
    password: 'password',
    birthday: 'birthday',
    hireDate: 'hireDate',
    phone: 'phone',
    active: 'active',
    guardCard: 'guardCard',
    supervisorCount: 'supervisorCount',
    managerCount: 'managerCount',
    logisticCount: 'logisticCount',
    driverCount: 'driverCount',
    dispatchCount: 'dispatchCount',
    assistantManagerCount: 'assistantManagerCount',
    contactName: 'contactName',
    contactPhone: 'contactPhone'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id: 'id',
    name: 'name',
    city: 'city',
    state: 'state',
    zipCode: 'zipCode',
    street: 'street',
    internalNumber: 'internalNumber',
    externalNumber: 'externalNumber',
    startDate: 'startDate',
    endDate: 'endDate',
    public: 'public',
    done: 'done',
    maxUsers: 'maxUsers'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const EventSectionScalarFieldEnum: {
    id: 'id',
    eventId: 'eventId',
    sectionName: 'sectionName',
    description: 'description'
  };

  export type EventSectionScalarFieldEnum = (typeof EventSectionScalarFieldEnum)[keyof typeof EventSectionScalarFieldEnum]


  export const SectionFileScalarFieldEnum: {
    id: 'id',
    sectionId: 'sectionId',
    name: 'name',
    dataBytes: 'dataBytes'
  };

  export type SectionFileScalarFieldEnum = (typeof SectionFileScalarFieldEnum)[keyof typeof SectionFileScalarFieldEnum]


  export const EventUserListScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    eventId: 'eventId',
    role: 'role'
  };

  export type EventUserListScalarFieldEnum = (typeof EventUserListScalarFieldEnum)[keyof typeof EventUserListScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'UserLevel'
   */
  export type EnumUserLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserLevel'>
    


  /**
   * Reference to a field of type 'UserLevel[]'
   */
  export type ListEnumUserLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserLevel[]'>
    


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'USAState'
   */
  export type EnumUSAStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'USAState'>
    


  /**
   * Reference to a field of type 'USAState[]'
   */
  export type ListEnumUSAStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'USAState[]'>
    


  /**
   * Reference to a field of type 'Bytes'
   */
  export type BytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes'>
    


  /**
   * Reference to a field of type 'Bytes[]'
   */
  export type ListBytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    level?: EnumUserLevelFilter<"User"> | $Enums.UserLevel
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    birthday?: DateTimeFilter<"User"> | Date | string
    hireDate?: DateTimeFilter<"User"> | Date | string
    phone?: StringFilter<"User"> | string
    active?: BoolFilter<"User"> | boolean
    guardCard?: BoolFilter<"User"> | boolean
    supervisorCount?: IntFilter<"User"> | number
    managerCount?: IntFilter<"User"> | number
    logisticCount?: IntFilter<"User"> | number
    driverCount?: IntFilter<"User"> | number
    dispatchCount?: IntFilter<"User"> | number
    assistantManagerCount?: IntFilter<"User"> | number
    contactName?: StringNullableFilter<"User"> | string | null
    contactPhone?: StringNullableFilter<"User"> | string | null
    eventUserList?: EventUserListListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    level?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    birthday?: SortOrder
    hireDate?: SortOrder
    phone?: SortOrder
    active?: SortOrder
    guardCard?: SortOrder
    supervisorCount?: SortOrder
    managerCount?: SortOrder
    logisticCount?: SortOrder
    driverCount?: SortOrder
    dispatchCount?: SortOrder
    assistantManagerCount?: SortOrder
    contactName?: SortOrderInput | SortOrder
    contactPhone?: SortOrderInput | SortOrder
    eventUserList?: EventUserListOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    level?: EnumUserLevelFilter<"User"> | $Enums.UserLevel
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    birthday?: DateTimeFilter<"User"> | Date | string
    hireDate?: DateTimeFilter<"User"> | Date | string
    phone?: StringFilter<"User"> | string
    active?: BoolFilter<"User"> | boolean
    guardCard?: BoolFilter<"User"> | boolean
    supervisorCount?: IntFilter<"User"> | number
    managerCount?: IntFilter<"User"> | number
    logisticCount?: IntFilter<"User"> | number
    driverCount?: IntFilter<"User"> | number
    dispatchCount?: IntFilter<"User"> | number
    assistantManagerCount?: IntFilter<"User"> | number
    contactName?: StringNullableFilter<"User"> | string | null
    contactPhone?: StringNullableFilter<"User"> | string | null
    eventUserList?: EventUserListListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    level?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    birthday?: SortOrder
    hireDate?: SortOrder
    phone?: SortOrder
    active?: SortOrder
    guardCard?: SortOrder
    supervisorCount?: SortOrder
    managerCount?: SortOrder
    logisticCount?: SortOrder
    driverCount?: SortOrder
    dispatchCount?: SortOrder
    assistantManagerCount?: SortOrder
    contactName?: SortOrderInput | SortOrder
    contactPhone?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    level?: EnumUserLevelWithAggregatesFilter<"User"> | $Enums.UserLevel
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    birthday?: DateTimeWithAggregatesFilter<"User"> | Date | string
    hireDate?: DateTimeWithAggregatesFilter<"User"> | Date | string
    phone?: StringWithAggregatesFilter<"User"> | string
    active?: BoolWithAggregatesFilter<"User"> | boolean
    guardCard?: BoolWithAggregatesFilter<"User"> | boolean
    supervisorCount?: IntWithAggregatesFilter<"User"> | number
    managerCount?: IntWithAggregatesFilter<"User"> | number
    logisticCount?: IntWithAggregatesFilter<"User"> | number
    driverCount?: IntWithAggregatesFilter<"User"> | number
    dispatchCount?: IntWithAggregatesFilter<"User"> | number
    assistantManagerCount?: IntWithAggregatesFilter<"User"> | number
    contactName?: StringNullableWithAggregatesFilter<"User"> | string | null
    contactPhone?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: IntFilter<"Event"> | number
    name?: StringFilter<"Event"> | string
    city?: StringFilter<"Event"> | string
    state?: EnumUSAStateFilter<"Event"> | $Enums.USAState
    zipCode?: StringFilter<"Event"> | string
    street?: StringFilter<"Event"> | string
    internalNumber?: IntNullableFilter<"Event"> | number | null
    externalNumber?: IntNullableFilter<"Event"> | number | null
    startDate?: DateTimeFilter<"Event"> | Date | string
    endDate?: DateTimeFilter<"Event"> | Date | string
    public?: BoolFilter<"Event"> | boolean
    done?: BoolFilter<"Event"> | boolean
    maxUsers?: IntFilter<"Event"> | number
    eventUsers?: EventUserListListRelationFilter
    sections?: EventSectionListRelationFilter
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    street?: SortOrder
    internalNumber?: SortOrderInput | SortOrder
    externalNumber?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    public?: SortOrder
    done?: SortOrder
    maxUsers?: SortOrder
    eventUsers?: EventUserListOrderByRelationAggregateInput
    sections?: EventSectionOrderByRelationAggregateInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    name?: StringFilter<"Event"> | string
    city?: StringFilter<"Event"> | string
    state?: EnumUSAStateFilter<"Event"> | $Enums.USAState
    zipCode?: StringFilter<"Event"> | string
    street?: StringFilter<"Event"> | string
    internalNumber?: IntNullableFilter<"Event"> | number | null
    externalNumber?: IntNullableFilter<"Event"> | number | null
    startDate?: DateTimeFilter<"Event"> | Date | string
    endDate?: DateTimeFilter<"Event"> | Date | string
    public?: BoolFilter<"Event"> | boolean
    done?: BoolFilter<"Event"> | boolean
    maxUsers?: IntFilter<"Event"> | number
    eventUsers?: EventUserListListRelationFilter
    sections?: EventSectionListRelationFilter
  }, "id">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    street?: SortOrder
    internalNumber?: SortOrderInput | SortOrder
    externalNumber?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    public?: SortOrder
    done?: SortOrder
    maxUsers?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _avg?: EventAvgOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
    _sum?: EventSumOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Event"> | number
    name?: StringWithAggregatesFilter<"Event"> | string
    city?: StringWithAggregatesFilter<"Event"> | string
    state?: EnumUSAStateWithAggregatesFilter<"Event"> | $Enums.USAState
    zipCode?: StringWithAggregatesFilter<"Event"> | string
    street?: StringWithAggregatesFilter<"Event"> | string
    internalNumber?: IntNullableWithAggregatesFilter<"Event"> | number | null
    externalNumber?: IntNullableWithAggregatesFilter<"Event"> | number | null
    startDate?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    public?: BoolWithAggregatesFilter<"Event"> | boolean
    done?: BoolWithAggregatesFilter<"Event"> | boolean
    maxUsers?: IntWithAggregatesFilter<"Event"> | number
  }

  export type EventSectionWhereInput = {
    AND?: EventSectionWhereInput | EventSectionWhereInput[]
    OR?: EventSectionWhereInput[]
    NOT?: EventSectionWhereInput | EventSectionWhereInput[]
    id?: IntFilter<"EventSection"> | number
    eventId?: IntFilter<"EventSection"> | number
    sectionName?: StringFilter<"EventSection"> | string
    description?: StringNullableFilter<"EventSection"> | string | null
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    files?: SectionFileListRelationFilter
  }

  export type EventSectionOrderByWithRelationInput = {
    id?: SortOrder
    eventId?: SortOrder
    sectionName?: SortOrder
    description?: SortOrderInput | SortOrder
    event?: EventOrderByWithRelationInput
    files?: SectionFileOrderByRelationAggregateInput
  }

  export type EventSectionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EventSectionWhereInput | EventSectionWhereInput[]
    OR?: EventSectionWhereInput[]
    NOT?: EventSectionWhereInput | EventSectionWhereInput[]
    eventId?: IntFilter<"EventSection"> | number
    sectionName?: StringFilter<"EventSection"> | string
    description?: StringNullableFilter<"EventSection"> | string | null
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    files?: SectionFileListRelationFilter
  }, "id">

  export type EventSectionOrderByWithAggregationInput = {
    id?: SortOrder
    eventId?: SortOrder
    sectionName?: SortOrder
    description?: SortOrderInput | SortOrder
    _count?: EventSectionCountOrderByAggregateInput
    _avg?: EventSectionAvgOrderByAggregateInput
    _max?: EventSectionMaxOrderByAggregateInput
    _min?: EventSectionMinOrderByAggregateInput
    _sum?: EventSectionSumOrderByAggregateInput
  }

  export type EventSectionScalarWhereWithAggregatesInput = {
    AND?: EventSectionScalarWhereWithAggregatesInput | EventSectionScalarWhereWithAggregatesInput[]
    OR?: EventSectionScalarWhereWithAggregatesInput[]
    NOT?: EventSectionScalarWhereWithAggregatesInput | EventSectionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"EventSection"> | number
    eventId?: IntWithAggregatesFilter<"EventSection"> | number
    sectionName?: StringWithAggregatesFilter<"EventSection"> | string
    description?: StringNullableWithAggregatesFilter<"EventSection"> | string | null
  }

  export type SectionFileWhereInput = {
    AND?: SectionFileWhereInput | SectionFileWhereInput[]
    OR?: SectionFileWhereInput[]
    NOT?: SectionFileWhereInput | SectionFileWhereInput[]
    id?: IntFilter<"SectionFile"> | number
    sectionId?: IntFilter<"SectionFile"> | number
    name?: StringFilter<"SectionFile"> | string
    dataBytes?: BytesFilter<"SectionFile"> | Uint8Array
    section?: XOR<EventSectionScalarRelationFilter, EventSectionWhereInput>
  }

  export type SectionFileOrderByWithRelationInput = {
    id?: SortOrder
    sectionId?: SortOrder
    name?: SortOrder
    dataBytes?: SortOrder
    section?: EventSectionOrderByWithRelationInput
  }

  export type SectionFileWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SectionFileWhereInput | SectionFileWhereInput[]
    OR?: SectionFileWhereInput[]
    NOT?: SectionFileWhereInput | SectionFileWhereInput[]
    sectionId?: IntFilter<"SectionFile"> | number
    name?: StringFilter<"SectionFile"> | string
    dataBytes?: BytesFilter<"SectionFile"> | Uint8Array
    section?: XOR<EventSectionScalarRelationFilter, EventSectionWhereInput>
  }, "id">

  export type SectionFileOrderByWithAggregationInput = {
    id?: SortOrder
    sectionId?: SortOrder
    name?: SortOrder
    dataBytes?: SortOrder
    _count?: SectionFileCountOrderByAggregateInput
    _avg?: SectionFileAvgOrderByAggregateInput
    _max?: SectionFileMaxOrderByAggregateInput
    _min?: SectionFileMinOrderByAggregateInput
    _sum?: SectionFileSumOrderByAggregateInput
  }

  export type SectionFileScalarWhereWithAggregatesInput = {
    AND?: SectionFileScalarWhereWithAggregatesInput | SectionFileScalarWhereWithAggregatesInput[]
    OR?: SectionFileScalarWhereWithAggregatesInput[]
    NOT?: SectionFileScalarWhereWithAggregatesInput | SectionFileScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SectionFile"> | number
    sectionId?: IntWithAggregatesFilter<"SectionFile"> | number
    name?: StringWithAggregatesFilter<"SectionFile"> | string
    dataBytes?: BytesWithAggregatesFilter<"SectionFile"> | Uint8Array
  }

  export type EventUserListWhereInput = {
    AND?: EventUserListWhereInput | EventUserListWhereInput[]
    OR?: EventUserListWhereInput[]
    NOT?: EventUserListWhereInput | EventUserListWhereInput[]
    id?: IntFilter<"EventUserList"> | number
    userId?: IntFilter<"EventUserList"> | number
    eventId?: IntFilter<"EventUserList"> | number
    role?: EnumUserRoleFilter<"EventUserList"> | $Enums.UserRole
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }

  export type EventUserListOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    eventId?: SortOrder
    role?: SortOrder
    user?: UserOrderByWithRelationInput
    event?: EventOrderByWithRelationInput
  }

  export type EventUserListWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EventUserListWhereInput | EventUserListWhereInput[]
    OR?: EventUserListWhereInput[]
    NOT?: EventUserListWhereInput | EventUserListWhereInput[]
    userId?: IntFilter<"EventUserList"> | number
    eventId?: IntFilter<"EventUserList"> | number
    role?: EnumUserRoleFilter<"EventUserList"> | $Enums.UserRole
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }, "id">

  export type EventUserListOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    eventId?: SortOrder
    role?: SortOrder
    _count?: EventUserListCountOrderByAggregateInput
    _avg?: EventUserListAvgOrderByAggregateInput
    _max?: EventUserListMaxOrderByAggregateInput
    _min?: EventUserListMinOrderByAggregateInput
    _sum?: EventUserListSumOrderByAggregateInput
  }

  export type EventUserListScalarWhereWithAggregatesInput = {
    AND?: EventUserListScalarWhereWithAggregatesInput | EventUserListScalarWhereWithAggregatesInput[]
    OR?: EventUserListScalarWhereWithAggregatesInput[]
    NOT?: EventUserListScalarWhereWithAggregatesInput | EventUserListScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"EventUserList"> | number
    userId?: IntWithAggregatesFilter<"EventUserList"> | number
    eventId?: IntWithAggregatesFilter<"EventUserList"> | number
    role?: EnumUserRoleWithAggregatesFilter<"EventUserList"> | $Enums.UserRole
  }

  export type UserCreateInput = {
    level?: $Enums.UserLevel
    name: string
    email: string
    password: string
    birthday: Date | string
    hireDate: Date | string
    phone: string
    active?: boolean
    guardCard?: boolean
    supervisorCount?: number
    managerCount?: number
    logisticCount?: number
    driverCount?: number
    dispatchCount?: number
    assistantManagerCount?: number
    contactName?: string | null
    contactPhone?: string | null
    eventUserList?: EventUserListCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    level?: $Enums.UserLevel
    name: string
    email: string
    password: string
    birthday: Date | string
    hireDate: Date | string
    phone: string
    active?: boolean
    guardCard?: boolean
    supervisorCount?: number
    managerCount?: number
    logisticCount?: number
    driverCount?: number
    dispatchCount?: number
    assistantManagerCount?: number
    contactName?: string | null
    contactPhone?: string | null
    eventUserList?: EventUserListUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    level?: EnumUserLevelFieldUpdateOperationsInput | $Enums.UserLevel
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    hireDate?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    guardCard?: BoolFieldUpdateOperationsInput | boolean
    supervisorCount?: IntFieldUpdateOperationsInput | number
    managerCount?: IntFieldUpdateOperationsInput | number
    logisticCount?: IntFieldUpdateOperationsInput | number
    driverCount?: IntFieldUpdateOperationsInput | number
    dispatchCount?: IntFieldUpdateOperationsInput | number
    assistantManagerCount?: IntFieldUpdateOperationsInput | number
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    eventUserList?: EventUserListUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    level?: EnumUserLevelFieldUpdateOperationsInput | $Enums.UserLevel
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    hireDate?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    guardCard?: BoolFieldUpdateOperationsInput | boolean
    supervisorCount?: IntFieldUpdateOperationsInput | number
    managerCount?: IntFieldUpdateOperationsInput | number
    logisticCount?: IntFieldUpdateOperationsInput | number
    driverCount?: IntFieldUpdateOperationsInput | number
    dispatchCount?: IntFieldUpdateOperationsInput | number
    assistantManagerCount?: IntFieldUpdateOperationsInput | number
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    eventUserList?: EventUserListUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    level?: $Enums.UserLevel
    name: string
    email: string
    password: string
    birthday: Date | string
    hireDate: Date | string
    phone: string
    active?: boolean
    guardCard?: boolean
    supervisorCount?: number
    managerCount?: number
    logisticCount?: number
    driverCount?: number
    dispatchCount?: number
    assistantManagerCount?: number
    contactName?: string | null
    contactPhone?: string | null
  }

  export type UserUpdateManyMutationInput = {
    level?: EnumUserLevelFieldUpdateOperationsInput | $Enums.UserLevel
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    hireDate?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    guardCard?: BoolFieldUpdateOperationsInput | boolean
    supervisorCount?: IntFieldUpdateOperationsInput | number
    managerCount?: IntFieldUpdateOperationsInput | number
    logisticCount?: IntFieldUpdateOperationsInput | number
    driverCount?: IntFieldUpdateOperationsInput | number
    dispatchCount?: IntFieldUpdateOperationsInput | number
    assistantManagerCount?: IntFieldUpdateOperationsInput | number
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    level?: EnumUserLevelFieldUpdateOperationsInput | $Enums.UserLevel
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    hireDate?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    guardCard?: BoolFieldUpdateOperationsInput | boolean
    supervisorCount?: IntFieldUpdateOperationsInput | number
    managerCount?: IntFieldUpdateOperationsInput | number
    logisticCount?: IntFieldUpdateOperationsInput | number
    driverCount?: IntFieldUpdateOperationsInput | number
    dispatchCount?: IntFieldUpdateOperationsInput | number
    assistantManagerCount?: IntFieldUpdateOperationsInput | number
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventCreateInput = {
    name: string
    city: string
    state?: $Enums.USAState
    zipCode: string
    street: string
    internalNumber?: number | null
    externalNumber?: number | null
    startDate: Date | string
    endDate: Date | string
    public?: boolean
    done?: boolean
    maxUsers?: number
    eventUsers?: EventUserListCreateNestedManyWithoutEventInput
    sections?: EventSectionCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    id?: number
    name: string
    city: string
    state?: $Enums.USAState
    zipCode: string
    street: string
    internalNumber?: number | null
    externalNumber?: number | null
    startDate: Date | string
    endDate: Date | string
    public?: boolean
    done?: boolean
    maxUsers?: number
    eventUsers?: EventUserListUncheckedCreateNestedManyWithoutEventInput
    sections?: EventSectionUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: EnumUSAStateFieldUpdateOperationsInput | $Enums.USAState
    zipCode?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    internalNumber?: NullableIntFieldUpdateOperationsInput | number | null
    externalNumber?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    public?: BoolFieldUpdateOperationsInput | boolean
    done?: BoolFieldUpdateOperationsInput | boolean
    maxUsers?: IntFieldUpdateOperationsInput | number
    eventUsers?: EventUserListUpdateManyWithoutEventNestedInput
    sections?: EventSectionUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: EnumUSAStateFieldUpdateOperationsInput | $Enums.USAState
    zipCode?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    internalNumber?: NullableIntFieldUpdateOperationsInput | number | null
    externalNumber?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    public?: BoolFieldUpdateOperationsInput | boolean
    done?: BoolFieldUpdateOperationsInput | boolean
    maxUsers?: IntFieldUpdateOperationsInput | number
    eventUsers?: EventUserListUncheckedUpdateManyWithoutEventNestedInput
    sections?: EventSectionUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateManyInput = {
    id?: number
    name: string
    city: string
    state?: $Enums.USAState
    zipCode: string
    street: string
    internalNumber?: number | null
    externalNumber?: number | null
    startDate: Date | string
    endDate: Date | string
    public?: boolean
    done?: boolean
    maxUsers?: number
  }

  export type EventUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: EnumUSAStateFieldUpdateOperationsInput | $Enums.USAState
    zipCode?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    internalNumber?: NullableIntFieldUpdateOperationsInput | number | null
    externalNumber?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    public?: BoolFieldUpdateOperationsInput | boolean
    done?: BoolFieldUpdateOperationsInput | boolean
    maxUsers?: IntFieldUpdateOperationsInput | number
  }

  export type EventUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: EnumUSAStateFieldUpdateOperationsInput | $Enums.USAState
    zipCode?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    internalNumber?: NullableIntFieldUpdateOperationsInput | number | null
    externalNumber?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    public?: BoolFieldUpdateOperationsInput | boolean
    done?: BoolFieldUpdateOperationsInput | boolean
    maxUsers?: IntFieldUpdateOperationsInput | number
  }

  export type EventSectionCreateInput = {
    sectionName: string
    description?: string | null
    event: EventCreateNestedOneWithoutSectionsInput
    files?: SectionFileCreateNestedManyWithoutSectionInput
  }

  export type EventSectionUncheckedCreateInput = {
    id?: number
    eventId: number
    sectionName: string
    description?: string | null
    files?: SectionFileUncheckedCreateNestedManyWithoutSectionInput
  }

  export type EventSectionUpdateInput = {
    sectionName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    event?: EventUpdateOneRequiredWithoutSectionsNestedInput
    files?: SectionFileUpdateManyWithoutSectionNestedInput
  }

  export type EventSectionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    sectionName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    files?: SectionFileUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type EventSectionCreateManyInput = {
    id?: number
    eventId: number
    sectionName: string
    description?: string | null
  }

  export type EventSectionUpdateManyMutationInput = {
    sectionName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventSectionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    sectionName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SectionFileCreateInput = {
    name: string
    dataBytes: Uint8Array
    section: EventSectionCreateNestedOneWithoutFilesInput
  }

  export type SectionFileUncheckedCreateInput = {
    id?: number
    sectionId: number
    name: string
    dataBytes: Uint8Array
  }

  export type SectionFileUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    dataBytes?: BytesFieldUpdateOperationsInput | Uint8Array
    section?: EventSectionUpdateOneRequiredWithoutFilesNestedInput
  }

  export type SectionFileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    sectionId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    dataBytes?: BytesFieldUpdateOperationsInput | Uint8Array
  }

  export type SectionFileCreateManyInput = {
    id?: number
    sectionId: number
    name: string
    dataBytes: Uint8Array
  }

  export type SectionFileUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    dataBytes?: BytesFieldUpdateOperationsInput | Uint8Array
  }

  export type SectionFileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    sectionId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    dataBytes?: BytesFieldUpdateOperationsInput | Uint8Array
  }

  export type EventUserListCreateInput = {
    role: $Enums.UserRole
    user: UserCreateNestedOneWithoutEventUserListInput
    event: EventCreateNestedOneWithoutEventUsersInput
  }

  export type EventUserListUncheckedCreateInput = {
    id?: number
    userId: number
    eventId: number
    role: $Enums.UserRole
  }

  export type EventUserListUpdateInput = {
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    user?: UserUpdateOneRequiredWithoutEventUserListNestedInput
    event?: EventUpdateOneRequiredWithoutEventUsersNestedInput
  }

  export type EventUserListUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
  }

  export type EventUserListCreateManyInput = {
    id?: number
    userId: number
    eventId: number
    role: $Enums.UserRole
  }

  export type EventUserListUpdateManyMutationInput = {
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
  }

  export type EventUserListUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumUserLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.UserLevel | EnumUserLevelFieldRefInput<$PrismaModel>
    in?: $Enums.UserLevel[] | ListEnumUserLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserLevel[] | ListEnumUserLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumUserLevelFilter<$PrismaModel> | $Enums.UserLevel
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

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type EventUserListListRelationFilter = {
    every?: EventUserListWhereInput
    some?: EventUserListWhereInput
    none?: EventUserListWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EventUserListOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    birthday?: SortOrder
    hireDate?: SortOrder
    phone?: SortOrder
    active?: SortOrder
    guardCard?: SortOrder
    supervisorCount?: SortOrder
    managerCount?: SortOrder
    logisticCount?: SortOrder
    driverCount?: SortOrder
    dispatchCount?: SortOrder
    assistantManagerCount?: SortOrder
    contactName?: SortOrder
    contactPhone?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    supervisorCount?: SortOrder
    managerCount?: SortOrder
    logisticCount?: SortOrder
    driverCount?: SortOrder
    dispatchCount?: SortOrder
    assistantManagerCount?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    birthday?: SortOrder
    hireDate?: SortOrder
    phone?: SortOrder
    active?: SortOrder
    guardCard?: SortOrder
    supervisorCount?: SortOrder
    managerCount?: SortOrder
    logisticCount?: SortOrder
    driverCount?: SortOrder
    dispatchCount?: SortOrder
    assistantManagerCount?: SortOrder
    contactName?: SortOrder
    contactPhone?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    birthday?: SortOrder
    hireDate?: SortOrder
    phone?: SortOrder
    active?: SortOrder
    guardCard?: SortOrder
    supervisorCount?: SortOrder
    managerCount?: SortOrder
    logisticCount?: SortOrder
    driverCount?: SortOrder
    dispatchCount?: SortOrder
    assistantManagerCount?: SortOrder
    contactName?: SortOrder
    contactPhone?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    supervisorCount?: SortOrder
    managerCount?: SortOrder
    logisticCount?: SortOrder
    driverCount?: SortOrder
    dispatchCount?: SortOrder
    assistantManagerCount?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumUserLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserLevel | EnumUserLevelFieldRefInput<$PrismaModel>
    in?: $Enums.UserLevel[] | ListEnumUserLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserLevel[] | ListEnumUserLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumUserLevelWithAggregatesFilter<$PrismaModel> | $Enums.UserLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserLevelFilter<$PrismaModel>
    _max?: NestedEnumUserLevelFilter<$PrismaModel>
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type EnumUSAStateFilter<$PrismaModel = never> = {
    equals?: $Enums.USAState | EnumUSAStateFieldRefInput<$PrismaModel>
    in?: $Enums.USAState[] | ListEnumUSAStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.USAState[] | ListEnumUSAStateFieldRefInput<$PrismaModel>
    not?: NestedEnumUSAStateFilter<$PrismaModel> | $Enums.USAState
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EventSectionListRelationFilter = {
    every?: EventSectionWhereInput
    some?: EventSectionWhereInput
    none?: EventSectionWhereInput
  }

  export type EventSectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    street?: SortOrder
    internalNumber?: SortOrder
    externalNumber?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    public?: SortOrder
    done?: SortOrder
    maxUsers?: SortOrder
  }

  export type EventAvgOrderByAggregateInput = {
    id?: SortOrder
    internalNumber?: SortOrder
    externalNumber?: SortOrder
    maxUsers?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    street?: SortOrder
    internalNumber?: SortOrder
    externalNumber?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    public?: SortOrder
    done?: SortOrder
    maxUsers?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    street?: SortOrder
    internalNumber?: SortOrder
    externalNumber?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    public?: SortOrder
    done?: SortOrder
    maxUsers?: SortOrder
  }

  export type EventSumOrderByAggregateInput = {
    id?: SortOrder
    internalNumber?: SortOrder
    externalNumber?: SortOrder
    maxUsers?: SortOrder
  }

  export type EnumUSAStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.USAState | EnumUSAStateFieldRefInput<$PrismaModel>
    in?: $Enums.USAState[] | ListEnumUSAStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.USAState[] | ListEnumUSAStateFieldRefInput<$PrismaModel>
    not?: NestedEnumUSAStateWithAggregatesFilter<$PrismaModel> | $Enums.USAState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUSAStateFilter<$PrismaModel>
    _max?: NestedEnumUSAStateFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EventScalarRelationFilter = {
    is?: EventWhereInput
    isNot?: EventWhereInput
  }

  export type SectionFileListRelationFilter = {
    every?: SectionFileWhereInput
    some?: SectionFileWhereInput
    none?: SectionFileWhereInput
  }

  export type SectionFileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventSectionCountOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    sectionName?: SortOrder
    description?: SortOrder
  }

  export type EventSectionAvgOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
  }

  export type EventSectionMaxOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    sectionName?: SortOrder
    description?: SortOrder
  }

  export type EventSectionMinOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    sectionName?: SortOrder
    description?: SortOrder
  }

  export type EventSectionSumOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
  }

  export type BytesFilter<$PrismaModel = never> = {
    equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
    in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesFilter<$PrismaModel> | Uint8Array
  }

  export type EventSectionScalarRelationFilter = {
    is?: EventSectionWhereInput
    isNot?: EventSectionWhereInput
  }

  export type SectionFileCountOrderByAggregateInput = {
    id?: SortOrder
    sectionId?: SortOrder
    name?: SortOrder
    dataBytes?: SortOrder
  }

  export type SectionFileAvgOrderByAggregateInput = {
    id?: SortOrder
    sectionId?: SortOrder
  }

  export type SectionFileMaxOrderByAggregateInput = {
    id?: SortOrder
    sectionId?: SortOrder
    name?: SortOrder
    dataBytes?: SortOrder
  }

  export type SectionFileMinOrderByAggregateInput = {
    id?: SortOrder
    sectionId?: SortOrder
    name?: SortOrder
    dataBytes?: SortOrder
  }

  export type SectionFileSumOrderByAggregateInput = {
    id?: SortOrder
    sectionId?: SortOrder
  }

  export type BytesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
    in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Uint8Array
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBytesFilter<$PrismaModel>
    _max?: NestedBytesFilter<$PrismaModel>
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type EventUserListCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eventId?: SortOrder
    role?: SortOrder
  }

  export type EventUserListAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eventId?: SortOrder
  }

  export type EventUserListMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eventId?: SortOrder
    role?: SortOrder
  }

  export type EventUserListMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eventId?: SortOrder
    role?: SortOrder
  }

  export type EventUserListSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eventId?: SortOrder
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type EventUserListCreateNestedManyWithoutUserInput = {
    create?: XOR<EventUserListCreateWithoutUserInput, EventUserListUncheckedCreateWithoutUserInput> | EventUserListCreateWithoutUserInput[] | EventUserListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventUserListCreateOrConnectWithoutUserInput | EventUserListCreateOrConnectWithoutUserInput[]
    createMany?: EventUserListCreateManyUserInputEnvelope
    connect?: EventUserListWhereUniqueInput | EventUserListWhereUniqueInput[]
  }

  export type EventUserListUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EventUserListCreateWithoutUserInput, EventUserListUncheckedCreateWithoutUserInput> | EventUserListCreateWithoutUserInput[] | EventUserListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventUserListCreateOrConnectWithoutUserInput | EventUserListCreateOrConnectWithoutUserInput[]
    createMany?: EventUserListCreateManyUserInputEnvelope
    connect?: EventUserListWhereUniqueInput | EventUserListWhereUniqueInput[]
  }

  export type EnumUserLevelFieldUpdateOperationsInput = {
    set?: $Enums.UserLevel
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EventUserListUpdateManyWithoutUserNestedInput = {
    create?: XOR<EventUserListCreateWithoutUserInput, EventUserListUncheckedCreateWithoutUserInput> | EventUserListCreateWithoutUserInput[] | EventUserListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventUserListCreateOrConnectWithoutUserInput | EventUserListCreateOrConnectWithoutUserInput[]
    upsert?: EventUserListUpsertWithWhereUniqueWithoutUserInput | EventUserListUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EventUserListCreateManyUserInputEnvelope
    set?: EventUserListWhereUniqueInput | EventUserListWhereUniqueInput[]
    disconnect?: EventUserListWhereUniqueInput | EventUserListWhereUniqueInput[]
    delete?: EventUserListWhereUniqueInput | EventUserListWhereUniqueInput[]
    connect?: EventUserListWhereUniqueInput | EventUserListWhereUniqueInput[]
    update?: EventUserListUpdateWithWhereUniqueWithoutUserInput | EventUserListUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EventUserListUpdateManyWithWhereWithoutUserInput | EventUserListUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EventUserListScalarWhereInput | EventUserListScalarWhereInput[]
  }

  export type EventUserListUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EventUserListCreateWithoutUserInput, EventUserListUncheckedCreateWithoutUserInput> | EventUserListCreateWithoutUserInput[] | EventUserListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventUserListCreateOrConnectWithoutUserInput | EventUserListCreateOrConnectWithoutUserInput[]
    upsert?: EventUserListUpsertWithWhereUniqueWithoutUserInput | EventUserListUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EventUserListCreateManyUserInputEnvelope
    set?: EventUserListWhereUniqueInput | EventUserListWhereUniqueInput[]
    disconnect?: EventUserListWhereUniqueInput | EventUserListWhereUniqueInput[]
    delete?: EventUserListWhereUniqueInput | EventUserListWhereUniqueInput[]
    connect?: EventUserListWhereUniqueInput | EventUserListWhereUniqueInput[]
    update?: EventUserListUpdateWithWhereUniqueWithoutUserInput | EventUserListUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EventUserListUpdateManyWithWhereWithoutUserInput | EventUserListUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EventUserListScalarWhereInput | EventUserListScalarWhereInput[]
  }

  export type EventUserListCreateNestedManyWithoutEventInput = {
    create?: XOR<EventUserListCreateWithoutEventInput, EventUserListUncheckedCreateWithoutEventInput> | EventUserListCreateWithoutEventInput[] | EventUserListUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventUserListCreateOrConnectWithoutEventInput | EventUserListCreateOrConnectWithoutEventInput[]
    createMany?: EventUserListCreateManyEventInputEnvelope
    connect?: EventUserListWhereUniqueInput | EventUserListWhereUniqueInput[]
  }

  export type EventSectionCreateNestedManyWithoutEventInput = {
    create?: XOR<EventSectionCreateWithoutEventInput, EventSectionUncheckedCreateWithoutEventInput> | EventSectionCreateWithoutEventInput[] | EventSectionUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventSectionCreateOrConnectWithoutEventInput | EventSectionCreateOrConnectWithoutEventInput[]
    createMany?: EventSectionCreateManyEventInputEnvelope
    connect?: EventSectionWhereUniqueInput | EventSectionWhereUniqueInput[]
  }

  export type EventUserListUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<EventUserListCreateWithoutEventInput, EventUserListUncheckedCreateWithoutEventInput> | EventUserListCreateWithoutEventInput[] | EventUserListUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventUserListCreateOrConnectWithoutEventInput | EventUserListCreateOrConnectWithoutEventInput[]
    createMany?: EventUserListCreateManyEventInputEnvelope
    connect?: EventUserListWhereUniqueInput | EventUserListWhereUniqueInput[]
  }

  export type EventSectionUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<EventSectionCreateWithoutEventInput, EventSectionUncheckedCreateWithoutEventInput> | EventSectionCreateWithoutEventInput[] | EventSectionUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventSectionCreateOrConnectWithoutEventInput | EventSectionCreateOrConnectWithoutEventInput[]
    createMany?: EventSectionCreateManyEventInputEnvelope
    connect?: EventSectionWhereUniqueInput | EventSectionWhereUniqueInput[]
  }

  export type EnumUSAStateFieldUpdateOperationsInput = {
    set?: $Enums.USAState
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EventUserListUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventUserListCreateWithoutEventInput, EventUserListUncheckedCreateWithoutEventInput> | EventUserListCreateWithoutEventInput[] | EventUserListUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventUserListCreateOrConnectWithoutEventInput | EventUserListCreateOrConnectWithoutEventInput[]
    upsert?: EventUserListUpsertWithWhereUniqueWithoutEventInput | EventUserListUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: EventUserListCreateManyEventInputEnvelope
    set?: EventUserListWhereUniqueInput | EventUserListWhereUniqueInput[]
    disconnect?: EventUserListWhereUniqueInput | EventUserListWhereUniqueInput[]
    delete?: EventUserListWhereUniqueInput | EventUserListWhereUniqueInput[]
    connect?: EventUserListWhereUniqueInput | EventUserListWhereUniqueInput[]
    update?: EventUserListUpdateWithWhereUniqueWithoutEventInput | EventUserListUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventUserListUpdateManyWithWhereWithoutEventInput | EventUserListUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventUserListScalarWhereInput | EventUserListScalarWhereInput[]
  }

  export type EventSectionUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventSectionCreateWithoutEventInput, EventSectionUncheckedCreateWithoutEventInput> | EventSectionCreateWithoutEventInput[] | EventSectionUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventSectionCreateOrConnectWithoutEventInput | EventSectionCreateOrConnectWithoutEventInput[]
    upsert?: EventSectionUpsertWithWhereUniqueWithoutEventInput | EventSectionUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: EventSectionCreateManyEventInputEnvelope
    set?: EventSectionWhereUniqueInput | EventSectionWhereUniqueInput[]
    disconnect?: EventSectionWhereUniqueInput | EventSectionWhereUniqueInput[]
    delete?: EventSectionWhereUniqueInput | EventSectionWhereUniqueInput[]
    connect?: EventSectionWhereUniqueInput | EventSectionWhereUniqueInput[]
    update?: EventSectionUpdateWithWhereUniqueWithoutEventInput | EventSectionUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventSectionUpdateManyWithWhereWithoutEventInput | EventSectionUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventSectionScalarWhereInput | EventSectionScalarWhereInput[]
  }

  export type EventUserListUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventUserListCreateWithoutEventInput, EventUserListUncheckedCreateWithoutEventInput> | EventUserListCreateWithoutEventInput[] | EventUserListUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventUserListCreateOrConnectWithoutEventInput | EventUserListCreateOrConnectWithoutEventInput[]
    upsert?: EventUserListUpsertWithWhereUniqueWithoutEventInput | EventUserListUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: EventUserListCreateManyEventInputEnvelope
    set?: EventUserListWhereUniqueInput | EventUserListWhereUniqueInput[]
    disconnect?: EventUserListWhereUniqueInput | EventUserListWhereUniqueInput[]
    delete?: EventUserListWhereUniqueInput | EventUserListWhereUniqueInput[]
    connect?: EventUserListWhereUniqueInput | EventUserListWhereUniqueInput[]
    update?: EventUserListUpdateWithWhereUniqueWithoutEventInput | EventUserListUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventUserListUpdateManyWithWhereWithoutEventInput | EventUserListUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventUserListScalarWhereInput | EventUserListScalarWhereInput[]
  }

  export type EventSectionUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventSectionCreateWithoutEventInput, EventSectionUncheckedCreateWithoutEventInput> | EventSectionCreateWithoutEventInput[] | EventSectionUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventSectionCreateOrConnectWithoutEventInput | EventSectionCreateOrConnectWithoutEventInput[]
    upsert?: EventSectionUpsertWithWhereUniqueWithoutEventInput | EventSectionUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: EventSectionCreateManyEventInputEnvelope
    set?: EventSectionWhereUniqueInput | EventSectionWhereUniqueInput[]
    disconnect?: EventSectionWhereUniqueInput | EventSectionWhereUniqueInput[]
    delete?: EventSectionWhereUniqueInput | EventSectionWhereUniqueInput[]
    connect?: EventSectionWhereUniqueInput | EventSectionWhereUniqueInput[]
    update?: EventSectionUpdateWithWhereUniqueWithoutEventInput | EventSectionUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventSectionUpdateManyWithWhereWithoutEventInput | EventSectionUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventSectionScalarWhereInput | EventSectionScalarWhereInput[]
  }

  export type EventCreateNestedOneWithoutSectionsInput = {
    create?: XOR<EventCreateWithoutSectionsInput, EventUncheckedCreateWithoutSectionsInput>
    connectOrCreate?: EventCreateOrConnectWithoutSectionsInput
    connect?: EventWhereUniqueInput
  }

  export type SectionFileCreateNestedManyWithoutSectionInput = {
    create?: XOR<SectionFileCreateWithoutSectionInput, SectionFileUncheckedCreateWithoutSectionInput> | SectionFileCreateWithoutSectionInput[] | SectionFileUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: SectionFileCreateOrConnectWithoutSectionInput | SectionFileCreateOrConnectWithoutSectionInput[]
    createMany?: SectionFileCreateManySectionInputEnvelope
    connect?: SectionFileWhereUniqueInput | SectionFileWhereUniqueInput[]
  }

  export type SectionFileUncheckedCreateNestedManyWithoutSectionInput = {
    create?: XOR<SectionFileCreateWithoutSectionInput, SectionFileUncheckedCreateWithoutSectionInput> | SectionFileCreateWithoutSectionInput[] | SectionFileUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: SectionFileCreateOrConnectWithoutSectionInput | SectionFileCreateOrConnectWithoutSectionInput[]
    createMany?: SectionFileCreateManySectionInputEnvelope
    connect?: SectionFileWhereUniqueInput | SectionFileWhereUniqueInput[]
  }

  export type EventUpdateOneRequiredWithoutSectionsNestedInput = {
    create?: XOR<EventCreateWithoutSectionsInput, EventUncheckedCreateWithoutSectionsInput>
    connectOrCreate?: EventCreateOrConnectWithoutSectionsInput
    upsert?: EventUpsertWithoutSectionsInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutSectionsInput, EventUpdateWithoutSectionsInput>, EventUncheckedUpdateWithoutSectionsInput>
  }

  export type SectionFileUpdateManyWithoutSectionNestedInput = {
    create?: XOR<SectionFileCreateWithoutSectionInput, SectionFileUncheckedCreateWithoutSectionInput> | SectionFileCreateWithoutSectionInput[] | SectionFileUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: SectionFileCreateOrConnectWithoutSectionInput | SectionFileCreateOrConnectWithoutSectionInput[]
    upsert?: SectionFileUpsertWithWhereUniqueWithoutSectionInput | SectionFileUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: SectionFileCreateManySectionInputEnvelope
    set?: SectionFileWhereUniqueInput | SectionFileWhereUniqueInput[]
    disconnect?: SectionFileWhereUniqueInput | SectionFileWhereUniqueInput[]
    delete?: SectionFileWhereUniqueInput | SectionFileWhereUniqueInput[]
    connect?: SectionFileWhereUniqueInput | SectionFileWhereUniqueInput[]
    update?: SectionFileUpdateWithWhereUniqueWithoutSectionInput | SectionFileUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: SectionFileUpdateManyWithWhereWithoutSectionInput | SectionFileUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: SectionFileScalarWhereInput | SectionFileScalarWhereInput[]
  }

  export type SectionFileUncheckedUpdateManyWithoutSectionNestedInput = {
    create?: XOR<SectionFileCreateWithoutSectionInput, SectionFileUncheckedCreateWithoutSectionInput> | SectionFileCreateWithoutSectionInput[] | SectionFileUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: SectionFileCreateOrConnectWithoutSectionInput | SectionFileCreateOrConnectWithoutSectionInput[]
    upsert?: SectionFileUpsertWithWhereUniqueWithoutSectionInput | SectionFileUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: SectionFileCreateManySectionInputEnvelope
    set?: SectionFileWhereUniqueInput | SectionFileWhereUniqueInput[]
    disconnect?: SectionFileWhereUniqueInput | SectionFileWhereUniqueInput[]
    delete?: SectionFileWhereUniqueInput | SectionFileWhereUniqueInput[]
    connect?: SectionFileWhereUniqueInput | SectionFileWhereUniqueInput[]
    update?: SectionFileUpdateWithWhereUniqueWithoutSectionInput | SectionFileUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: SectionFileUpdateManyWithWhereWithoutSectionInput | SectionFileUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: SectionFileScalarWhereInput | SectionFileScalarWhereInput[]
  }

  export type EventSectionCreateNestedOneWithoutFilesInput = {
    create?: XOR<EventSectionCreateWithoutFilesInput, EventSectionUncheckedCreateWithoutFilesInput>
    connectOrCreate?: EventSectionCreateOrConnectWithoutFilesInput
    connect?: EventSectionWhereUniqueInput
  }

  export type BytesFieldUpdateOperationsInput = {
    set?: Uint8Array
  }

  export type EventSectionUpdateOneRequiredWithoutFilesNestedInput = {
    create?: XOR<EventSectionCreateWithoutFilesInput, EventSectionUncheckedCreateWithoutFilesInput>
    connectOrCreate?: EventSectionCreateOrConnectWithoutFilesInput
    upsert?: EventSectionUpsertWithoutFilesInput
    connect?: EventSectionWhereUniqueInput
    update?: XOR<XOR<EventSectionUpdateToOneWithWhereWithoutFilesInput, EventSectionUpdateWithoutFilesInput>, EventSectionUncheckedUpdateWithoutFilesInput>
  }

  export type UserCreateNestedOneWithoutEventUserListInput = {
    create?: XOR<UserCreateWithoutEventUserListInput, UserUncheckedCreateWithoutEventUserListInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventUserListInput
    connect?: UserWhereUniqueInput
  }

  export type EventCreateNestedOneWithoutEventUsersInput = {
    create?: XOR<EventCreateWithoutEventUsersInput, EventUncheckedCreateWithoutEventUsersInput>
    connectOrCreate?: EventCreateOrConnectWithoutEventUsersInput
    connect?: EventWhereUniqueInput
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type UserUpdateOneRequiredWithoutEventUserListNestedInput = {
    create?: XOR<UserCreateWithoutEventUserListInput, UserUncheckedCreateWithoutEventUserListInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventUserListInput
    upsert?: UserUpsertWithoutEventUserListInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEventUserListInput, UserUpdateWithoutEventUserListInput>, UserUncheckedUpdateWithoutEventUserListInput>
  }

  export type EventUpdateOneRequiredWithoutEventUsersNestedInput = {
    create?: XOR<EventCreateWithoutEventUsersInput, EventUncheckedCreateWithoutEventUsersInput>
    connectOrCreate?: EventCreateOrConnectWithoutEventUsersInput
    upsert?: EventUpsertWithoutEventUsersInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutEventUsersInput, EventUpdateWithoutEventUsersInput>, EventUncheckedUpdateWithoutEventUsersInput>
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

  export type NestedEnumUserLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.UserLevel | EnumUserLevelFieldRefInput<$PrismaModel>
    in?: $Enums.UserLevel[] | ListEnumUserLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserLevel[] | ListEnumUserLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumUserLevelFilter<$PrismaModel> | $Enums.UserLevel
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

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumUserLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserLevel | EnumUserLevelFieldRefInput<$PrismaModel>
    in?: $Enums.UserLevel[] | ListEnumUserLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserLevel[] | ListEnumUserLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumUserLevelWithAggregatesFilter<$PrismaModel> | $Enums.UserLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserLevelFilter<$PrismaModel>
    _max?: NestedEnumUserLevelFilter<$PrismaModel>
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

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumUSAStateFilter<$PrismaModel = never> = {
    equals?: $Enums.USAState | EnumUSAStateFieldRefInput<$PrismaModel>
    in?: $Enums.USAState[] | ListEnumUSAStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.USAState[] | ListEnumUSAStateFieldRefInput<$PrismaModel>
    not?: NestedEnumUSAStateFilter<$PrismaModel> | $Enums.USAState
  }

  export type NestedEnumUSAStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.USAState | EnumUSAStateFieldRefInput<$PrismaModel>
    in?: $Enums.USAState[] | ListEnumUSAStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.USAState[] | ListEnumUSAStateFieldRefInput<$PrismaModel>
    not?: NestedEnumUSAStateWithAggregatesFilter<$PrismaModel> | $Enums.USAState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUSAStateFilter<$PrismaModel>
    _max?: NestedEnumUSAStateFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBytesFilter<$PrismaModel = never> = {
    equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
    in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesFilter<$PrismaModel> | Uint8Array
  }

  export type NestedBytesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
    in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Uint8Array
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBytesFilter<$PrismaModel>
    _max?: NestedBytesFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type EventUserListCreateWithoutUserInput = {
    role: $Enums.UserRole
    event: EventCreateNestedOneWithoutEventUsersInput
  }

  export type EventUserListUncheckedCreateWithoutUserInput = {
    id?: number
    eventId: number
    role: $Enums.UserRole
  }

  export type EventUserListCreateOrConnectWithoutUserInput = {
    where: EventUserListWhereUniqueInput
    create: XOR<EventUserListCreateWithoutUserInput, EventUserListUncheckedCreateWithoutUserInput>
  }

  export type EventUserListCreateManyUserInputEnvelope = {
    data: EventUserListCreateManyUserInput | EventUserListCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type EventUserListUpsertWithWhereUniqueWithoutUserInput = {
    where: EventUserListWhereUniqueInput
    update: XOR<EventUserListUpdateWithoutUserInput, EventUserListUncheckedUpdateWithoutUserInput>
    create: XOR<EventUserListCreateWithoutUserInput, EventUserListUncheckedCreateWithoutUserInput>
  }

  export type EventUserListUpdateWithWhereUniqueWithoutUserInput = {
    where: EventUserListWhereUniqueInput
    data: XOR<EventUserListUpdateWithoutUserInput, EventUserListUncheckedUpdateWithoutUserInput>
  }

  export type EventUserListUpdateManyWithWhereWithoutUserInput = {
    where: EventUserListScalarWhereInput
    data: XOR<EventUserListUpdateManyMutationInput, EventUserListUncheckedUpdateManyWithoutUserInput>
  }

  export type EventUserListScalarWhereInput = {
    AND?: EventUserListScalarWhereInput | EventUserListScalarWhereInput[]
    OR?: EventUserListScalarWhereInput[]
    NOT?: EventUserListScalarWhereInput | EventUserListScalarWhereInput[]
    id?: IntFilter<"EventUserList"> | number
    userId?: IntFilter<"EventUserList"> | number
    eventId?: IntFilter<"EventUserList"> | number
    role?: EnumUserRoleFilter<"EventUserList"> | $Enums.UserRole
  }

  export type EventUserListCreateWithoutEventInput = {
    role: $Enums.UserRole
    user: UserCreateNestedOneWithoutEventUserListInput
  }

  export type EventUserListUncheckedCreateWithoutEventInput = {
    id?: number
    userId: number
    role: $Enums.UserRole
  }

  export type EventUserListCreateOrConnectWithoutEventInput = {
    where: EventUserListWhereUniqueInput
    create: XOR<EventUserListCreateWithoutEventInput, EventUserListUncheckedCreateWithoutEventInput>
  }

  export type EventUserListCreateManyEventInputEnvelope = {
    data: EventUserListCreateManyEventInput | EventUserListCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type EventSectionCreateWithoutEventInput = {
    sectionName: string
    description?: string | null
    files?: SectionFileCreateNestedManyWithoutSectionInput
  }

  export type EventSectionUncheckedCreateWithoutEventInput = {
    id?: number
    sectionName: string
    description?: string | null
    files?: SectionFileUncheckedCreateNestedManyWithoutSectionInput
  }

  export type EventSectionCreateOrConnectWithoutEventInput = {
    where: EventSectionWhereUniqueInput
    create: XOR<EventSectionCreateWithoutEventInput, EventSectionUncheckedCreateWithoutEventInput>
  }

  export type EventSectionCreateManyEventInputEnvelope = {
    data: EventSectionCreateManyEventInput | EventSectionCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type EventUserListUpsertWithWhereUniqueWithoutEventInput = {
    where: EventUserListWhereUniqueInput
    update: XOR<EventUserListUpdateWithoutEventInput, EventUserListUncheckedUpdateWithoutEventInput>
    create: XOR<EventUserListCreateWithoutEventInput, EventUserListUncheckedCreateWithoutEventInput>
  }

  export type EventUserListUpdateWithWhereUniqueWithoutEventInput = {
    where: EventUserListWhereUniqueInput
    data: XOR<EventUserListUpdateWithoutEventInput, EventUserListUncheckedUpdateWithoutEventInput>
  }

  export type EventUserListUpdateManyWithWhereWithoutEventInput = {
    where: EventUserListScalarWhereInput
    data: XOR<EventUserListUpdateManyMutationInput, EventUserListUncheckedUpdateManyWithoutEventInput>
  }

  export type EventSectionUpsertWithWhereUniqueWithoutEventInput = {
    where: EventSectionWhereUniqueInput
    update: XOR<EventSectionUpdateWithoutEventInput, EventSectionUncheckedUpdateWithoutEventInput>
    create: XOR<EventSectionCreateWithoutEventInput, EventSectionUncheckedCreateWithoutEventInput>
  }

  export type EventSectionUpdateWithWhereUniqueWithoutEventInput = {
    where: EventSectionWhereUniqueInput
    data: XOR<EventSectionUpdateWithoutEventInput, EventSectionUncheckedUpdateWithoutEventInput>
  }

  export type EventSectionUpdateManyWithWhereWithoutEventInput = {
    where: EventSectionScalarWhereInput
    data: XOR<EventSectionUpdateManyMutationInput, EventSectionUncheckedUpdateManyWithoutEventInput>
  }

  export type EventSectionScalarWhereInput = {
    AND?: EventSectionScalarWhereInput | EventSectionScalarWhereInput[]
    OR?: EventSectionScalarWhereInput[]
    NOT?: EventSectionScalarWhereInput | EventSectionScalarWhereInput[]
    id?: IntFilter<"EventSection"> | number
    eventId?: IntFilter<"EventSection"> | number
    sectionName?: StringFilter<"EventSection"> | string
    description?: StringNullableFilter<"EventSection"> | string | null
  }

  export type EventCreateWithoutSectionsInput = {
    name: string
    city: string
    state?: $Enums.USAState
    zipCode: string
    street: string
    internalNumber?: number | null
    externalNumber?: number | null
    startDate: Date | string
    endDate: Date | string
    public?: boolean
    done?: boolean
    maxUsers?: number
    eventUsers?: EventUserListCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutSectionsInput = {
    id?: number
    name: string
    city: string
    state?: $Enums.USAState
    zipCode: string
    street: string
    internalNumber?: number | null
    externalNumber?: number | null
    startDate: Date | string
    endDate: Date | string
    public?: boolean
    done?: boolean
    maxUsers?: number
    eventUsers?: EventUserListUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutSectionsInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutSectionsInput, EventUncheckedCreateWithoutSectionsInput>
  }

  export type SectionFileCreateWithoutSectionInput = {
    name: string
    dataBytes: Uint8Array
  }

  export type SectionFileUncheckedCreateWithoutSectionInput = {
    id?: number
    name: string
    dataBytes: Uint8Array
  }

  export type SectionFileCreateOrConnectWithoutSectionInput = {
    where: SectionFileWhereUniqueInput
    create: XOR<SectionFileCreateWithoutSectionInput, SectionFileUncheckedCreateWithoutSectionInput>
  }

  export type SectionFileCreateManySectionInputEnvelope = {
    data: SectionFileCreateManySectionInput | SectionFileCreateManySectionInput[]
    skipDuplicates?: boolean
  }

  export type EventUpsertWithoutSectionsInput = {
    update: XOR<EventUpdateWithoutSectionsInput, EventUncheckedUpdateWithoutSectionsInput>
    create: XOR<EventCreateWithoutSectionsInput, EventUncheckedCreateWithoutSectionsInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutSectionsInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutSectionsInput, EventUncheckedUpdateWithoutSectionsInput>
  }

  export type EventUpdateWithoutSectionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: EnumUSAStateFieldUpdateOperationsInput | $Enums.USAState
    zipCode?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    internalNumber?: NullableIntFieldUpdateOperationsInput | number | null
    externalNumber?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    public?: BoolFieldUpdateOperationsInput | boolean
    done?: BoolFieldUpdateOperationsInput | boolean
    maxUsers?: IntFieldUpdateOperationsInput | number
    eventUsers?: EventUserListUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutSectionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: EnumUSAStateFieldUpdateOperationsInput | $Enums.USAState
    zipCode?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    internalNumber?: NullableIntFieldUpdateOperationsInput | number | null
    externalNumber?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    public?: BoolFieldUpdateOperationsInput | boolean
    done?: BoolFieldUpdateOperationsInput | boolean
    maxUsers?: IntFieldUpdateOperationsInput | number
    eventUsers?: EventUserListUncheckedUpdateManyWithoutEventNestedInput
  }

  export type SectionFileUpsertWithWhereUniqueWithoutSectionInput = {
    where: SectionFileWhereUniqueInput
    update: XOR<SectionFileUpdateWithoutSectionInput, SectionFileUncheckedUpdateWithoutSectionInput>
    create: XOR<SectionFileCreateWithoutSectionInput, SectionFileUncheckedCreateWithoutSectionInput>
  }

  export type SectionFileUpdateWithWhereUniqueWithoutSectionInput = {
    where: SectionFileWhereUniqueInput
    data: XOR<SectionFileUpdateWithoutSectionInput, SectionFileUncheckedUpdateWithoutSectionInput>
  }

  export type SectionFileUpdateManyWithWhereWithoutSectionInput = {
    where: SectionFileScalarWhereInput
    data: XOR<SectionFileUpdateManyMutationInput, SectionFileUncheckedUpdateManyWithoutSectionInput>
  }

  export type SectionFileScalarWhereInput = {
    AND?: SectionFileScalarWhereInput | SectionFileScalarWhereInput[]
    OR?: SectionFileScalarWhereInput[]
    NOT?: SectionFileScalarWhereInput | SectionFileScalarWhereInput[]
    id?: IntFilter<"SectionFile"> | number
    sectionId?: IntFilter<"SectionFile"> | number
    name?: StringFilter<"SectionFile"> | string
    dataBytes?: BytesFilter<"SectionFile"> | Uint8Array
  }

  export type EventSectionCreateWithoutFilesInput = {
    sectionName: string
    description?: string | null
    event: EventCreateNestedOneWithoutSectionsInput
  }

  export type EventSectionUncheckedCreateWithoutFilesInput = {
    id?: number
    eventId: number
    sectionName: string
    description?: string | null
  }

  export type EventSectionCreateOrConnectWithoutFilesInput = {
    where: EventSectionWhereUniqueInput
    create: XOR<EventSectionCreateWithoutFilesInput, EventSectionUncheckedCreateWithoutFilesInput>
  }

  export type EventSectionUpsertWithoutFilesInput = {
    update: XOR<EventSectionUpdateWithoutFilesInput, EventSectionUncheckedUpdateWithoutFilesInput>
    create: XOR<EventSectionCreateWithoutFilesInput, EventSectionUncheckedCreateWithoutFilesInput>
    where?: EventSectionWhereInput
  }

  export type EventSectionUpdateToOneWithWhereWithoutFilesInput = {
    where?: EventSectionWhereInput
    data: XOR<EventSectionUpdateWithoutFilesInput, EventSectionUncheckedUpdateWithoutFilesInput>
  }

  export type EventSectionUpdateWithoutFilesInput = {
    sectionName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    event?: EventUpdateOneRequiredWithoutSectionsNestedInput
  }

  export type EventSectionUncheckedUpdateWithoutFilesInput = {
    id?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    sectionName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateWithoutEventUserListInput = {
    level?: $Enums.UserLevel
    name: string
    email: string
    password: string
    birthday: Date | string
    hireDate: Date | string
    phone: string
    active?: boolean
    guardCard?: boolean
    supervisorCount?: number
    managerCount?: number
    logisticCount?: number
    driverCount?: number
    dispatchCount?: number
    assistantManagerCount?: number
    contactName?: string | null
    contactPhone?: string | null
  }

  export type UserUncheckedCreateWithoutEventUserListInput = {
    id?: number
    level?: $Enums.UserLevel
    name: string
    email: string
    password: string
    birthday: Date | string
    hireDate: Date | string
    phone: string
    active?: boolean
    guardCard?: boolean
    supervisorCount?: number
    managerCount?: number
    logisticCount?: number
    driverCount?: number
    dispatchCount?: number
    assistantManagerCount?: number
    contactName?: string | null
    contactPhone?: string | null
  }

  export type UserCreateOrConnectWithoutEventUserListInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEventUserListInput, UserUncheckedCreateWithoutEventUserListInput>
  }

  export type EventCreateWithoutEventUsersInput = {
    name: string
    city: string
    state?: $Enums.USAState
    zipCode: string
    street: string
    internalNumber?: number | null
    externalNumber?: number | null
    startDate: Date | string
    endDate: Date | string
    public?: boolean
    done?: boolean
    maxUsers?: number
    sections?: EventSectionCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutEventUsersInput = {
    id?: number
    name: string
    city: string
    state?: $Enums.USAState
    zipCode: string
    street: string
    internalNumber?: number | null
    externalNumber?: number | null
    startDate: Date | string
    endDate: Date | string
    public?: boolean
    done?: boolean
    maxUsers?: number
    sections?: EventSectionUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutEventUsersInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutEventUsersInput, EventUncheckedCreateWithoutEventUsersInput>
  }

  export type UserUpsertWithoutEventUserListInput = {
    update: XOR<UserUpdateWithoutEventUserListInput, UserUncheckedUpdateWithoutEventUserListInput>
    create: XOR<UserCreateWithoutEventUserListInput, UserUncheckedCreateWithoutEventUserListInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEventUserListInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEventUserListInput, UserUncheckedUpdateWithoutEventUserListInput>
  }

  export type UserUpdateWithoutEventUserListInput = {
    level?: EnumUserLevelFieldUpdateOperationsInput | $Enums.UserLevel
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    hireDate?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    guardCard?: BoolFieldUpdateOperationsInput | boolean
    supervisorCount?: IntFieldUpdateOperationsInput | number
    managerCount?: IntFieldUpdateOperationsInput | number
    logisticCount?: IntFieldUpdateOperationsInput | number
    driverCount?: IntFieldUpdateOperationsInput | number
    dispatchCount?: IntFieldUpdateOperationsInput | number
    assistantManagerCount?: IntFieldUpdateOperationsInput | number
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateWithoutEventUserListInput = {
    id?: IntFieldUpdateOperationsInput | number
    level?: EnumUserLevelFieldUpdateOperationsInput | $Enums.UserLevel
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    hireDate?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    guardCard?: BoolFieldUpdateOperationsInput | boolean
    supervisorCount?: IntFieldUpdateOperationsInput | number
    managerCount?: IntFieldUpdateOperationsInput | number
    logisticCount?: IntFieldUpdateOperationsInput | number
    driverCount?: IntFieldUpdateOperationsInput | number
    dispatchCount?: IntFieldUpdateOperationsInput | number
    assistantManagerCount?: IntFieldUpdateOperationsInput | number
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventUpsertWithoutEventUsersInput = {
    update: XOR<EventUpdateWithoutEventUsersInput, EventUncheckedUpdateWithoutEventUsersInput>
    create: XOR<EventCreateWithoutEventUsersInput, EventUncheckedCreateWithoutEventUsersInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutEventUsersInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutEventUsersInput, EventUncheckedUpdateWithoutEventUsersInput>
  }

  export type EventUpdateWithoutEventUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: EnumUSAStateFieldUpdateOperationsInput | $Enums.USAState
    zipCode?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    internalNumber?: NullableIntFieldUpdateOperationsInput | number | null
    externalNumber?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    public?: BoolFieldUpdateOperationsInput | boolean
    done?: BoolFieldUpdateOperationsInput | boolean
    maxUsers?: IntFieldUpdateOperationsInput | number
    sections?: EventSectionUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutEventUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: EnumUSAStateFieldUpdateOperationsInput | $Enums.USAState
    zipCode?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    internalNumber?: NullableIntFieldUpdateOperationsInput | number | null
    externalNumber?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    public?: BoolFieldUpdateOperationsInput | boolean
    done?: BoolFieldUpdateOperationsInput | boolean
    maxUsers?: IntFieldUpdateOperationsInput | number
    sections?: EventSectionUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUserListCreateManyUserInput = {
    id?: number
    eventId: number
    role: $Enums.UserRole
  }

  export type EventUserListUpdateWithoutUserInput = {
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    event?: EventUpdateOneRequiredWithoutEventUsersNestedInput
  }

  export type EventUserListUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
  }

  export type EventUserListUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    eventId?: IntFieldUpdateOperationsInput | number
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
  }

  export type EventUserListCreateManyEventInput = {
    id?: number
    userId: number
    role: $Enums.UserRole
  }

  export type EventSectionCreateManyEventInput = {
    id?: number
    sectionName: string
    description?: string | null
  }

  export type EventUserListUpdateWithoutEventInput = {
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    user?: UserUpdateOneRequiredWithoutEventUserListNestedInput
  }

  export type EventUserListUncheckedUpdateWithoutEventInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
  }

  export type EventUserListUncheckedUpdateManyWithoutEventInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
  }

  export type EventSectionUpdateWithoutEventInput = {
    sectionName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    files?: SectionFileUpdateManyWithoutSectionNestedInput
  }

  export type EventSectionUncheckedUpdateWithoutEventInput = {
    id?: IntFieldUpdateOperationsInput | number
    sectionName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    files?: SectionFileUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type EventSectionUncheckedUpdateManyWithoutEventInput = {
    id?: IntFieldUpdateOperationsInput | number
    sectionName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SectionFileCreateManySectionInput = {
    id?: number
    name: string
    dataBytes: Uint8Array
  }

  export type SectionFileUpdateWithoutSectionInput = {
    name?: StringFieldUpdateOperationsInput | string
    dataBytes?: BytesFieldUpdateOperationsInput | Uint8Array
  }

  export type SectionFileUncheckedUpdateWithoutSectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    dataBytes?: BytesFieldUpdateOperationsInput | Uint8Array
  }

  export type SectionFileUncheckedUpdateManyWithoutSectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    dataBytes?: BytesFieldUpdateOperationsInput | Uint8Array
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

Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/edge.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
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

exports.Prisma.EventScalarFieldEnum = {
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

exports.Prisma.EventSectionScalarFieldEnum = {
  id: 'id',
  eventId: 'eventId',
  sectionName: 'sectionName',
  description: 'description'
};

exports.Prisma.SectionFileScalarFieldEnum = {
  id: 'id',
  sectionId: 'sectionId',
  name: 'name',
  dataBytes: 'dataBytes'
};

exports.Prisma.EventUserListScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  eventId: 'eventId',
  role: 'role'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.UserRole = exports.$Enums.UserRole = {
  SUPERVISOR: 'SUPERVISOR',
  MANAGER: 'MANAGER',
  LOGISTIC: 'LOGISTIC',
  DRIVER: 'DRIVER',
  DISPATCH: 'DISPATCH',
  ASSISTANT_MANAGER: 'ASSISTANT_MANAGER'
};

exports.UserLevel = exports.$Enums.UserLevel = {
  MASTER: 'MASTER',
  ADMIN: 'ADMIN',
  STAFF: 'STAFF'
};

exports.GenericRequestStatus = exports.$Enums.GenericRequestStatus = {
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
  ACCEPTED: 'ACCEPTED'
};

exports.USAState = exports.$Enums.USAState = {
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

exports.Prisma.ModelName = {
  User: 'User',
  Event: 'Event',
  EventSection: 'EventSection',
  SectionFile: 'SectionFile',
  EventUserList: 'EventUserList'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Users\\Usuario\\dev\\iem-event-management-system\\app\\generated\\prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "C:\\Users\\Usuario\\dev\\iem-event-management-system\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma",
  "clientVersion": "6.6.0",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": "postgres://postgres:root@localhost:5432/iemdb"
      }
    }
  },
  "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = \"prisma-client-js\"\n  output   = \"../app/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nenum UserRole {\n  SUPERVISOR\n  MANAGER\n  LOGISTIC\n  DRIVER\n  DISPATCH\n  ASSISTANT_MANAGER\n}\n\nenum UserLevel {\n  MASTER\n  ADMIN\n  STAFF\n}\n\nenum GenericRequestStatus {\n  PENDING\n  REJECTED\n  ACCEPTED\n}\n\nenum USAState {\n  ALABAMA\n  ALASKA\n  ARIZONA\n  ARKANSAS\n  CALIFORNIA\n  COLORADO\n  CONNECTICUT\n  DELAWARE\n  FLORIDA\n  GEORGIA\n  HAWAII\n  IDAHO\n  ILLINOIS\n  INDIANA\n  IOWA\n  KANSAS\n  KENTUCKY\n  LOUISIANA\n  MAINE\n  MARYLAND\n  MASSACHUSETTS\n  MICHIGAN\n  MINNESOTA\n  MISSISSIPPI\n  MISSOURI\n  MONTANA\n  NEBRASKA\n  NEVADA\n  NEW_HAMPSHIRE\n  NEW_JERSEY\n  NEW_MEXICO\n  NEW_YORK\n  NORTH_CAROLINA\n  NORTH_DAKOTA\n  OHIO\n  OKLAHOMA\n  OREGON\n  PENNSYLVANIA\n  RHODE_ISLAND\n  SOUTH_CAROLINA\n  SOUTH_DAKOTA\n  TENNESSEE\n  TEXAS\n  UTAH\n  VERMONT\n  VIRGINIA\n  WASHINGTON\n  WEST_VIRGINIA\n  WISCONSIN\n  WYOMING\n}\n\nmodel User {\n  id       Int       @id @default(autoincrement())\n  level    UserLevel @default(STAFF)\n  name     String\n  email    String    @unique\n  password String\n\n  birthday  DateTime\n  hireDate  DateTime\n  phone     String\n  active    Boolean  @default(false)\n  guardCard Boolean  @default(false)\n\n  supervisorCount       Int @default(0)\n  managerCount          Int @default(0)\n  logisticCount         Int @default(0)\n  driverCount           Int @default(0)\n  dispatchCount         Int @default(0)\n  assistantManagerCount Int @default(0)\n\n  contactName  String?\n  contactPhone String?\n\n  eventUserList EventUserList[]\n}\n\nmodel Event {\n  id             Int      @id @default(autoincrement())\n  name           String\n  city           String\n  state          USAState @default(CALIFORNIA)\n  zipCode        String\n  street         String\n  internalNumber Int?\n  externalNumber Int?\n\n  startDate DateTime\n  endDate   DateTime\n  public    Boolean  @default(false)\n  done      Boolean  @default(false)\n  maxUsers  Int      @default(1)\n\n  eventUsers EventUserList[]\n  sections   EventSection[]\n}\n\nmodel EventSection {\n  id          Int     @id @default(autoincrement())\n  eventId     Int\n  sectionName String\n  description String?\n  event       Event   @relation(fields: [eventId], references: [id])\n\n  files SectionFile[]\n}\n\nmodel SectionFile {\n  id        Int          @id @default(autoincrement())\n  sectionId Int\n  name      String\n  dataBytes Bytes\n  section   EventSection @relation(fields: [sectionId], references: [id])\n}\n\nmodel EventUserList {\n  id      Int      @id @default(autoincrement())\n  userId  Int\n  eventId Int\n  role    UserRole\n  user    User     @relation(fields: [userId], references: [id])\n  event   Event    @relation(fields: [eventId], references: [id])\n}\n",
  "inlineSchemaHash": "215903ba2c6e920b6eab5cea2b00de6d39524620a07060acca532e46bbc6173d",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"level\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"UserLevel\",\"nativeType\":null,\"default\":\"STAFF\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"birthday\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hireDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"guardCard\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"supervisorCount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"managerCount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"logisticCount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"driverCount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dispatchCount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"assistantManagerCount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"contactName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"contactPhone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"eventUserList\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EventUserList\",\"nativeType\":null,\"relationName\":\"EventUserListToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Event\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"city\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"state\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"USAState\",\"nativeType\":null,\"default\":\"CALIFORNIA\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"zipCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"street\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"internalNumber\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"externalNumber\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"endDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"public\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"done\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"maxUsers\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"eventUsers\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EventUserList\",\"nativeType\":null,\"relationName\":\"EventToEventUserList\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sections\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EventSection\",\"nativeType\":null,\"relationName\":\"EventToEventSection\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"EventSection\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"eventId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sectionName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"event\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Event\",\"nativeType\":null,\"relationName\":\"EventToEventSection\",\"relationFromFields\":[\"eventId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"files\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SectionFile\",\"nativeType\":null,\"relationName\":\"EventSectionToSectionFile\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"SectionFile\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sectionId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dataBytes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"section\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EventSection\",\"nativeType\":null,\"relationName\":\"EventSectionToSectionFile\",\"relationFromFields\":[\"sectionId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"EventUserList\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"eventId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserRole\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"EventUserListToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"event\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Event\",\"nativeType\":null,\"relationName\":\"EventToEventUserList\",\"relationFromFields\":[\"eventId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"UserRole\":{\"values\":[{\"name\":\"SUPERVISOR\",\"dbName\":null},{\"name\":\"MANAGER\",\"dbName\":null},{\"name\":\"LOGISTIC\",\"dbName\":null},{\"name\":\"DRIVER\",\"dbName\":null},{\"name\":\"DISPATCH\",\"dbName\":null},{\"name\":\"ASSISTANT_MANAGER\",\"dbName\":null}],\"dbName\":null},\"UserLevel\":{\"values\":[{\"name\":\"MASTER\",\"dbName\":null},{\"name\":\"ADMIN\",\"dbName\":null},{\"name\":\"STAFF\",\"dbName\":null}],\"dbName\":null},\"GenericRequestStatus\":{\"values\":[{\"name\":\"PENDING\",\"dbName\":null},{\"name\":\"REJECTED\",\"dbName\":null},{\"name\":\"ACCEPTED\",\"dbName\":null}],\"dbName\":null},\"USAState\":{\"values\":[{\"name\":\"ALABAMA\",\"dbName\":null},{\"name\":\"ALASKA\",\"dbName\":null},{\"name\":\"ARIZONA\",\"dbName\":null},{\"name\":\"ARKANSAS\",\"dbName\":null},{\"name\":\"CALIFORNIA\",\"dbName\":null},{\"name\":\"COLORADO\",\"dbName\":null},{\"name\":\"CONNECTICUT\",\"dbName\":null},{\"name\":\"DELAWARE\",\"dbName\":null},{\"name\":\"FLORIDA\",\"dbName\":null},{\"name\":\"GEORGIA\",\"dbName\":null},{\"name\":\"HAWAII\",\"dbName\":null},{\"name\":\"IDAHO\",\"dbName\":null},{\"name\":\"ILLINOIS\",\"dbName\":null},{\"name\":\"INDIANA\",\"dbName\":null},{\"name\":\"IOWA\",\"dbName\":null},{\"name\":\"KANSAS\",\"dbName\":null},{\"name\":\"KENTUCKY\",\"dbName\":null},{\"name\":\"LOUISIANA\",\"dbName\":null},{\"name\":\"MAINE\",\"dbName\":null},{\"name\":\"MARYLAND\",\"dbName\":null},{\"name\":\"MASSACHUSETTS\",\"dbName\":null},{\"name\":\"MICHIGAN\",\"dbName\":null},{\"name\":\"MINNESOTA\",\"dbName\":null},{\"name\":\"MISSISSIPPI\",\"dbName\":null},{\"name\":\"MISSOURI\",\"dbName\":null},{\"name\":\"MONTANA\",\"dbName\":null},{\"name\":\"NEBRASKA\",\"dbName\":null},{\"name\":\"NEVADA\",\"dbName\":null},{\"name\":\"NEW_HAMPSHIRE\",\"dbName\":null},{\"name\":\"NEW_JERSEY\",\"dbName\":null},{\"name\":\"NEW_MEXICO\",\"dbName\":null},{\"name\":\"NEW_YORK\",\"dbName\":null},{\"name\":\"NORTH_CAROLINA\",\"dbName\":null},{\"name\":\"NORTH_DAKOTA\",\"dbName\":null},{\"name\":\"OHIO\",\"dbName\":null},{\"name\":\"OKLAHOMA\",\"dbName\":null},{\"name\":\"OREGON\",\"dbName\":null},{\"name\":\"PENNSYLVANIA\",\"dbName\":null},{\"name\":\"RHODE_ISLAND\",\"dbName\":null},{\"name\":\"SOUTH_CAROLINA\",\"dbName\":null},{\"name\":\"SOUTH_DAKOTA\",\"dbName\":null},{\"name\":\"TENNESSEE\",\"dbName\":null},{\"name\":\"TEXAS\",\"dbName\":null},{\"name\":\"UTAH\",\"dbName\":null},{\"name\":\"VERMONT\",\"dbName\":null},{\"name\":\"VIRGINIA\",\"dbName\":null},{\"name\":\"WASHINGTON\",\"dbName\":null},{\"name\":\"WEST_VIRGINIA\",\"dbName\":null},{\"name\":\"WISCONSIN\",\"dbName\":null},{\"name\":\"WYOMING\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)


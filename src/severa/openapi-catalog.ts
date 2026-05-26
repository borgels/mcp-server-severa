// Generated from https://api.severa.visma.com/psapublicrest/openapidocs/v1.0/doc.json
// Do not edit by hand unless the upstream OpenAPI document is unavailable.

export type SeveraOperationRisk = 'read' | 'write' | 'destructive';
export type SeveraCatalogMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface SeveraCatalogParameter {
  name: string;
  in: string;
  required: boolean;
  description?: string;
  type?: string;
  explode?: boolean;
}

export interface SeveraCatalogOperation {
  id: string;
  method: SeveraCatalogMethod;
  path: string;
  tag: string;
  summary: string;
  description?: string;
  scopes: string[];
  risk: SeveraOperationRisk;
  parameters: SeveraCatalogParameter[];
  requestSchema?: string;
  responseSchema?: string;
}

export const SEVERA_OPENAPI_SOURCE = "https://api.severa.visma.com/psapublicrest/openapidocs/v1.0/doc.json";
export const SEVERA_OPENAPI_VERSION = "1.0";
export const SEVERA_DEFAULT_BASE_URL = "https://api.severa.visma.com/rest-api";
export const SEVERA_OPERATIONS = [
  {
    "id": "Addresses_GetAddresses",
    "method": "GET",
    "path": "/v1/addresses",
    "tag": "CustomersRead",
    "summary": "Get the addresses.",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get addresses that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<AddressModel>"
  },
  {
    "id": "Addresses_GetAddress",
    "method": "GET",
    "path": "/v1/addresses/{guid}",
    "tag": "CustomersRead",
    "summary": "Get address by ID.",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the address.",
        "type": "string"
      }
    ],
    "responseSchema": "AddressModel"
  },
  {
    "id": "Addresses_PatchAddress",
    "method": "PATCH",
    "path": "/v1/addresses/{guid}",
    "tag": "CustomersWrite",
    "summary": "Update (Patch) an address or a part of it.",
    "scopes": [
      "customers:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the address.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<AddressModel>"
  },
  {
    "id": "Addresses_DeleteAddress",
    "method": "DELETE",
    "path": "/v1/addresses/{guid}",
    "tag": "CustomersDelete",
    "summary": "Delete an address.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if address can't be found.",
    "scopes": [
      "customers:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the address to delete.",
        "type": "string"
      }
    ]
  },
  {
    "id": "Addresses_GetCustomerAddresses",
    "method": "GET",
    "path": "/v1/customers/{customerGuid}/addresses",
    "tag": "CustomersRead",
    "summary": "Get customer's addresses",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "customerGuid",
        "in": "path",
        "required": true,
        "description": "ID for the customer.",
        "type": "string"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<AddressModel>"
  },
  {
    "id": "Addresses_PostCustomerAddress",
    "method": "POST",
    "path": "/v1/customers/{customerGuid}/addresses",
    "tag": "CustomersWrite",
    "summary": "Insert an address.",
    "scopes": [
      "customers:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "customerGuid",
        "in": "path",
        "required": true,
        "description": "ID of the customer to add the address for.",
        "type": "string"
      }
    ],
    "requestSchema": "AddressModel",
    "responseSchema": "AddressModel"
  },
  {
    "id": "Addresses_GetContactAddress",
    "method": "GET",
    "path": "/v1/contactpersons/{contactGuid}/addresses",
    "tag": "CustomersRead",
    "summary": "Get contact person's address",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "contactGuid",
        "in": "path",
        "required": true,
        "description": "ID for the contact person",
        "type": "string"
      }
    ],
    "responseSchema": "array<AddressModel>"
  },
  {
    "id": "BusinessUnits_GetBusinessUnits",
    "method": "GET",
    "path": "/v1/businessunits",
    "tag": "SettingsRead",
    "summary": "Get all the BusinessUnits",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all BusinessUnits, if given as true return only active BusinessUnits, if given as false returns only inactive BusinessUnits",
        "type": "boolean"
      },
      {
        "name": "companyGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the company to which the business units belong.",
        "type": "string"
      },
      {
        "name": "companyCountryGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the country in which the company of business units is located.",
        "type": "string"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from business unit name.",
        "type": "string"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get business units that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "code",
        "in": "query",
        "required": false,
        "description": "Optional: Code of the business unit.",
        "type": "string"
      },
      {
        "name": "name",
        "in": "query",
        "required": false,
        "description": "Optional: Name of the business unit.",
        "type": "string"
      }
    ],
    "responseSchema": "array<BusinessUnitModel>"
  },
  {
    "id": "BusinessUnits_PostBusinessUnit",
    "method": "POST",
    "path": "/v1/businessunits",
    "tag": "SettingsWrite",
    "summary": "Insert a business unit.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "BusinessUnitModel",
    "responseSchema": "BusinessUnitModel"
  },
  {
    "id": "BusinessUnits_GetBusinessUnit",
    "method": "GET",
    "path": "/v1/businessunits/{guid}",
    "tag": "SettingsRead",
    "summary": "Get businessUnit by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the businessUnit.",
        "type": "string"
      }
    ],
    "responseSchema": "BusinessUnitModel"
  },
  {
    "id": "BusinessUnits_PatchBusinessUnit",
    "method": "PATCH",
    "path": "/v1/businessunits/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) an businessUnit or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the businessUnit.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<BusinessUnitModel>"
  },
  {
    "id": "BusinessUnits_DeleteBusinessUnit",
    "method": "DELETE",
    "path": "/v1/businessunits/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete a business unit.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if business unit can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the business unit to delete.",
        "type": "string"
      },
      {
        "name": "moveUsagesToGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the business unit to which to move usages of this business unit. Default null. The new business unit must be in the same Organization company, otherwise the usages won't be moved. If business unit is in use and usages aren't moved the deletion might fail.",
        "type": "string"
      }
    ]
  },
  {
    "id": "CommunicationTypes_GetCommunicationTypes",
    "method": "GET",
    "path": "/v1/communicationtypes",
    "tag": "SettingsRead",
    "summary": "Get all communication types.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "Filter the communication types. If true/false, only the active/inactive ones are returned. If null, all the communication types are returned.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from communication type name.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=name&sortings[0].value=Asc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<CommunicationTypeModel>"
  },
  {
    "id": "CommunicationTypes_PostCommunicationType",
    "method": "POST",
    "path": "/v1/communicationtypes",
    "tag": "SettingsWrite",
    "summary": "Insert a communication type.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "CommunicationTypeModel",
    "responseSchema": "CommunicationTypeModel"
  },
  {
    "id": "CommunicationTypes_GetCommunicationType",
    "method": "GET",
    "path": "/v1/communicationtypes/{guid}",
    "tag": "SettingsRead",
    "summary": "Get communication type by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID used to get the communication type.",
        "type": "string"
      }
    ],
    "responseSchema": "CommunicationTypeModel"
  },
  {
    "id": "CommunicationTypes_PatchCommunicationType",
    "method": "PATCH",
    "path": "/v1/communicationtypes/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a communication type or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the communication type.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<CommunicationTypeModel>"
  },
  {
    "id": "CommunicationTypes_DeleteCommunicationType",
    "method": "DELETE",
    "path": "/v1/communicationtypes/{guid}",
    "tag": "SettingsDelete",
    "summary": "Deletes a communication type.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the communication type.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ContactCommunications_GetCommunications",
    "method": "GET",
    "path": "/v1/contactcommunications",
    "tag": "CustomersRead",
    "summary": "Get all contact communications.",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all contact communications, if given as true return only active contact communications, if given as false returns only inactive contact communications.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from contact communication value.",
        "type": "string"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get contact communications that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<ContactCommunicationModel>"
  },
  {
    "id": "ContactCommunications_PostContactCommunication",
    "method": "POST",
    "path": "/v1/contactcommunications",
    "tag": "CustomersWrite",
    "summary": "Insert a communication for a contact.",
    "scopes": [
      "customers:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ContactCommunicationModel",
    "responseSchema": "ContactCommunicationModel"
  },
  {
    "id": "ContactCommunications_GetCommunication",
    "method": "GET",
    "path": "/v1/contactcommunications/{guid}",
    "tag": "CustomersRead",
    "summary": "Get contact communication by ID.",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the contact communication.",
        "type": "string"
      }
    ],
    "responseSchema": "ContactCommunicationModel"
  },
  {
    "id": "ContactCommunications_PatchContactCommunication",
    "method": "PATCH",
    "path": "/v1/contactcommunications/{guid}",
    "tag": "CustomersWrite",
    "summary": "Update (Patch) a contact's communication or a part of it.",
    "scopes": [
      "customers:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the contact's communication.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "ContactCommunicationModel"
  },
  {
    "id": "ContactCommunications_DeleteContactCommunication",
    "method": "DELETE",
    "path": "/v1/contactcommunications/{guid}",
    "tag": "CustomersDelete",
    "summary": "Deletes contact's communication.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "customers:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the contact's communication.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ContactCommunications_GetCommunications2",
    "method": "GET",
    "path": "/v1/contacts/{contactGuid}/contactcommunications",
    "tag": "CustomersRead",
    "summary": "Get all communications for a contact.",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "contactGuid",
        "in": "path",
        "required": true,
        "description": "Whose communications are requested.",
        "type": "string"
      },
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all contact communications, if given as true return only active contact communications, if given as false returns only inactive contact communications.",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<ContactCommunicationModel>"
  },
  {
    "id": "ContactRoles_GetContactRoles",
    "method": "GET",
    "path": "/v1/contactroles",
    "tag": "SettingsRead",
    "summary": "Get contact roles.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all contact roles, if given as true return only active contact roles, if given as false returns only inactive contact roles.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from contact role name.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<ContactRoleModel>"
  },
  {
    "id": "ContactRoles_PostContactRole",
    "method": "POST",
    "path": "/v1/contactroles",
    "tag": "SettingsWrite",
    "summary": "Insert a contact role.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ContactRoleModel",
    "responseSchema": "ContactRoleModel"
  },
  {
    "id": "ContactRoles_GetContactRole",
    "method": "GET",
    "path": "/v1/contactroles/{guid}",
    "tag": "SettingsRead",
    "summary": "Get contact role by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the contact role.",
        "type": "string"
      }
    ],
    "responseSchema": "ContactRoleModel"
  },
  {
    "id": "ContactRoles_PatchContactRole",
    "method": "PATCH",
    "path": "/v1/contactroles/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a contact role or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the contact role.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ContactRoleModel>"
  },
  {
    "id": "ContactRoles_DeleteContactRole",
    "method": "DELETE",
    "path": "/v1/contactroles/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete a contact role.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if contact role can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the contact role to delete.",
        "type": "string"
      },
      {
        "name": "moveUsagesToGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the contact role to which to move usages of this contact role. Default null. If contact role is in use and usages aren't moved the deletion might fail.",
        "type": "string"
      }
    ]
  },
  {
    "id": "Contacts_GetCustomerContacts",
    "method": "GET",
    "path": "/v1/customers/{customerGuid}/contactpersons",
    "tag": "CustomersRead",
    "summary": "Get the contact persons for a customer.",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "customerGuid",
        "in": "path",
        "required": true,
        "description": "Customer guid used to get the contact persons.",
        "type": "string"
      },
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all Contact persons, if given as true return only active Contact persons, if given as false returns only inactive Contact persons.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from contact person's name or communication method (i.e. phone number or email address).",
        "type": "string"
      }
    ],
    "responseSchema": "array<ContactModel>"
  },
  {
    "id": "Contacts_GetContacts",
    "method": "GET",
    "path": "/v1/contactpersons",
    "tag": "CustomersRead",
    "summary": "Get all the contact persons.",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all Contact persons, if given as true return only active Contact persons, if given as false returns only inactive Contact persons.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from contact person's name or communication method (i.e. phone number or email address).",
        "type": "string"
      },
      {
        "name": "searchCriterias",
        "in": "query",
        "required": false,
        "description": "Optional: Search criterias.",
        "type": "array<KeyValuePairOfStringAndObject>",
        "explode": true
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=FirstName&sortings[0].value=Desc &sortings[1].key=LastName&sortings[1].value=Asc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get contact persons that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "changedSinceOptions",
        "in": "query",
        "required": false,
        "description": "Optional: Extend changedSince parameter by searching from linked resources.",
        "type": "array<ContactChangedSinceSearchExtensionOptions>",
        "explode": true
      }
    ],
    "responseSchema": "array<ContactModel>"
  },
  {
    "id": "Contacts_PostContact",
    "method": "POST",
    "path": "/v1/contactpersons",
    "tag": "CustomersWrite",
    "summary": "Insert a contact.",
    "scopes": [
      "customers:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ContactModel",
    "responseSchema": "ContactModel"
  },
  {
    "id": "Contacts_GetContact",
    "method": "GET",
    "path": "/v1/contactpersons/{guid}",
    "tag": "CustomersRead",
    "summary": "Get contact by ID.",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the contact.",
        "type": "string"
      }
    ],
    "responseSchema": "ContactModel"
  },
  {
    "id": "Contacts_PatchContact",
    "method": "PATCH",
    "path": "/v1/contactpersons/{guid}",
    "tag": "CustomersWrite",
    "summary": "Update (Patch) an contact or a part of it.",
    "scopes": [
      "customers:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the contact.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ContactModel>"
  },
  {
    "id": "Contacts_DeleteContact",
    "method": "DELETE",
    "path": "/v1/contactpersons/{guid}",
    "tag": "CustomersDelete",
    "summary": "Deletes a contact.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "customers:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the contact.",
        "type": "string"
      }
    ]
  },
  {
    "id": "CostAccounts_GetCostAccounts",
    "method": "GET",
    "path": "/v1/costaccounts",
    "tag": "SettingsRead",
    "summary": "Get cost accounts.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all cost accounts, if given as true return only active cost accounts, if given as false returns only inactive cost accounts.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from cost account name or identifier.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=Name&sortings[0].value=Desc &sortings[1].key=Identifier&sortings[1].value=Asc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<CostAccountModel>"
  },
  {
    "id": "CostAccounts_PostCostAccount",
    "method": "POST",
    "path": "/v1/costaccounts",
    "tag": "SettingsWrite",
    "summary": "Insert a cost account.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "CostAccountModel",
    "responseSchema": "CostAccountModel"
  },
  {
    "id": "CostAccounts_GetCostAccount",
    "method": "GET",
    "path": "/v1/costaccounts/{guid}",
    "tag": "SettingsRead",
    "summary": "Get cost account by Guid.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Cost account's guid.",
        "type": "string"
      }
    ],
    "responseSchema": "CostAccountModel"
  },
  {
    "id": "CostAccounts_PatchCostAccount",
    "method": "PATCH",
    "path": "/v1/costaccounts/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a cost account or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the cost account.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<CostAccountModel>"
  },
  {
    "id": "CostAccounts_DeleteCostAccount",
    "method": "DELETE",
    "path": "/v1/costaccounts/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete a cost account.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if cost account can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the cost account to delete.",
        "type": "string"
      }
    ]
  },
  {
    "id": "CostCenters_GetCostCenters",
    "method": "GET",
    "path": "/v1/costcenters",
    "tag": "SettingsRead",
    "summary": "Get cost centers.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all cost centers, if given as true return only active cost centers, if given as false returns only inactive cost centers.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from cost center name or identifier.",
        "type": "string"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get cost centers that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      },
      {
        "name": "identifier",
        "in": "query",
        "required": false,
        "description": "Optional: Identifier of the cost center.",
        "type": "string"
      },
      {
        "name": "name",
        "in": "query",
        "required": false,
        "description": "Optional: Name of the cost center.",
        "type": "string"
      }
    ],
    "responseSchema": "array<CostCenterModel>"
  },
  {
    "id": "CostCenters_PostCostCenter",
    "method": "POST",
    "path": "/v1/costcenters",
    "tag": "SettingsWrite",
    "summary": "Insert a cost center.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "CostCenterModel",
    "responseSchema": "CostCenterModel"
  },
  {
    "id": "CostCenters_GetCostCenter",
    "method": "GET",
    "path": "/v1/costcenters/{guid}",
    "tag": "SettingsRead",
    "summary": "Get cost center by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the cost center.",
        "type": "string"
      }
    ],
    "responseSchema": "CostCenterModel"
  },
  {
    "id": "CostCenters_PatchCostCenter",
    "method": "PATCH",
    "path": "/v1/costcenters/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a cost center or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the cost center.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<CostCenterModel>"
  },
  {
    "id": "CostCenters_DeleteCostCenter",
    "method": "DELETE",
    "path": "/v1/costcenters/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete a cost center.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if cost center can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the cost center to delete.",
        "type": "string"
      }
    ]
  },
  {
    "id": "Countries_GetCountries",
    "method": "GET",
    "path": "/v1/localization/countries",
    "tag": "SettingsRead",
    "summary": "Get all the Countries.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [],
    "responseSchema": "array<CountryModel>"
  },
  {
    "id": "Countries_GetCountry",
    "method": "GET",
    "path": "/v1/localization/countries/{guid}",
    "tag": "SettingsRead",
    "summary": "Get country by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the country.",
        "type": "string"
      }
    ],
    "responseSchema": "CountryModel"
  },
  {
    "id": "Countries_GetCountryRegions",
    "method": "GET",
    "path": "/v1/localization/countries/{countryGuid}/countryregions",
    "tag": "SettingsRead",
    "summary": "Get all the Country regions for a country.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "countryGuid",
        "in": "path",
        "required": true,
        "description": "GUID of the country.",
        "type": "string"
      }
    ],
    "responseSchema": "array<CountryRegionModel>"
  },
  {
    "id": "Countries_GetCountryRegion",
    "method": "GET",
    "path": "/v1/localization/countryregions/{guid}",
    "tag": "SettingsRead",
    "summary": "Get country region by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the country region.",
        "type": "string"
      }
    ],
    "responseSchema": "CountryRegionModel"
  },
  {
    "id": "CustomerMarketSegments_GetCustomerMarketSegments",
    "method": "GET",
    "path": "/v1/customers/{customerGuid}/customermarketsegments",
    "tag": "CustomersRead",
    "summary": "Get the Market Segments for a customer.",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "customerGuid",
        "in": "path",
        "required": true,
        "description": "ID of the customer.",
        "type": "string"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "includeMarketSegmentsFromRegistry",
        "in": "query",
        "required": false,
        "description": "Optional: Return also the markets segments that are not in use for the customer.",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<CustomerMarketSegmentModel>"
  },
  {
    "id": "CustomerMarketSegments_GetAllCustomerMarketSegments",
    "method": "GET",
    "path": "/v1/customermarketsegments",
    "tag": "CustomersRead",
    "summary": "Get all Customer Market Segments.",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from customer market segment name.",
        "type": "string"
      },
      {
        "name": "parentMarketSegmentGuid",
        "in": "query",
        "required": false,
        "description": "Optional: Fetches all children of a parent based on parent market segment guid.",
        "type": "string"
      },
      {
        "name": "includeParentLevel",
        "in": "query",
        "required": false,
        "description": "Optional: Returns only child segments when false. Has no effect if parentMarketSegmentGuid parameter is defined. Default = true.",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<CustomerMarketSegmentModel>"
  },
  {
    "id": "CustomerMarketSegments_PostCustomerMarketSegment",
    "method": "POST",
    "path": "/v1/customermarketsegments",
    "tag": "CustomersWrite",
    "summary": "Add a market segment for customer.",
    "scopes": [
      "customers:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "CustomerMarketSegmentModel",
    "responseSchema": "CustomerMarketSegmentModel"
  },
  {
    "id": "CustomerMarketSegments_GetCustomerMarketSegment",
    "method": "GET",
    "path": "/v1/customermarketsegments/{guid}",
    "tag": "CustomersRead",
    "summary": "Get the customer market segment.",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Customer market segment guid.",
        "type": "string"
      }
    ],
    "responseSchema": "CustomerMarketSegmentModel"
  },
  {
    "id": "CustomerMarketSegments_DeleteCustomerMarketSegment",
    "method": "DELETE",
    "path": "/v1/customermarketsegments/{guid}",
    "tag": "CustomersDelete",
    "summary": "Deletes a customer market segment.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if customer market segment can't be found.",
    "scopes": [
      "customers:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the customer market segment to delete.",
        "type": "string"
      }
    ]
  },
  {
    "id": "FileData_GetDataForFile",
    "method": "GET",
    "path": "/v1/files/{guid}/filedata",
    "tag": "FilesRead",
    "summary": "Get file data by ID.",
    "description": "Returns binary data, which contains content with type given in Content-Type header.",
    "scopes": [
      "files:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the file.",
        "type": "string"
      }
    ],
    "responseSchema": "string:binary"
  },
  {
    "id": "Files_GetFile",
    "method": "GET",
    "path": "/v1/files/{guid}",
    "tag": "FilesRead",
    "summary": "Get file by ID.",
    "scopes": [
      "files:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the file.",
        "type": "string"
      },
      {
        "name": "includeDataInResponse",
        "in": "query",
        "required": false,
        "description": "Is data included in response as base64 string.",
        "type": "boolean"
      }
    ],
    "responseSchema": "FileModel"
  },
  {
    "id": "Files_GetProjectFiles",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/files",
    "tag": "FilesRead",
    "summary": "Get all files of a project by its id.",
    "scopes": [
      "files:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "GUID of the project used to get the files.",
        "type": "string"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch.",
        "type": "integer:int32"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=Name&sortings[0].value=Desc&sortings[1].key=Number&sortings[1].value=Asc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<ProjectFileModel>"
  },
  {
    "id": "Files_PostProjectFile",
    "method": "POST",
    "path": "/v1/projects/{projectGuid}/files",
    "tag": "FilesWrite",
    "summary": "Insert a project file.",
    "description": "Supports multiple files and meta data. Expects MIME multipart content, with optional FileModel JSON content before binary file data. POST /projects/{projectGuid}/files HTTP/1.1 Authorization: Bearer your_auth_token Content-Type: multipart/related; boundary=randomboundarystring Content-Length: number_of_bytes_in_entire_request_body --randomboundarystring Content-Type: application/json {\"Description\" : \"SomeFileDescription\", \"Name\" : \"somefile.ext\"} --randomboundarystring Content-Type: 'image/jpeg' or 'link' Binary data --randomboundarystring--.",
    "scopes": [
      "files:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "GUID of the project to insert file to.",
        "type": "string"
      },
      {
        "name": "includeDataInResponse",
        "in": "query",
        "required": false,
        "description": "Is data included in response as base64 string.",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<ProjectFileModel>"
  },
  {
    "id": "Files_GetProjectFile",
    "method": "GET",
    "path": "/v1/projectfiles/{guid}",
    "tag": "FilesRead",
    "summary": "Get project file by ID.",
    "scopes": [
      "files:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the project file.",
        "type": "string"
      }
    ],
    "responseSchema": "ProjectFileModel"
  },
  {
    "id": "Files_DeleteProjectFile",
    "method": "DELETE",
    "path": "/v1/projectfiles/{guid}",
    "tag": "FilesDelete",
    "summary": "Deletes a project file.",
    "description": "Deletes both project file and file data. Returns: No Content (204) if succeeded.",
    "scopes": [
      "files:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the project file.",
        "type": "string"
      }
    ]
  },
  {
    "id": "Files_PostProjectLink",
    "method": "POST",
    "path": "/v1/projectlinks",
    "tag": "ProjectsWrite",
    "summary": "Add a link to a project.",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProjectFileModel",
    "responseSchema": "ProjectFileModel"
  },
  {
    "id": "Files_GetInvoiceFiles",
    "method": "GET",
    "path": "/v1/invoices/{invoiceGuid}/files",
    "tag": "FilesRead",
    "summary": "Get all files of a invoice by its id.",
    "scopes": [
      "files:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "invoiceGuid",
        "in": "path",
        "required": true,
        "description": "GUID of the invoice used to get the files.",
        "type": "string"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch.",
        "type": "integer:int32"
      }
    ],
    "responseSchema": "array<InvoiceFileModel>"
  },
  {
    "id": "Files_GetInvoiceFile",
    "method": "GET",
    "path": "/v1/invoicefiles/{guid}",
    "tag": "FilesRead",
    "summary": "Get invoice file by ID.",
    "scopes": [
      "files:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the invoice file.",
        "type": "string"
      }
    ],
    "responseSchema": "InvoiceFileModel"
  },
  {
    "id": "Files_GetUsersTravelExpensesFiles",
    "method": "GET",
    "path": "/v1/users/{userGuid}/travelexpensesfiles",
    "tag": "FilesRead",
    "summary": "Get all files of all travel expenses of the user.",
    "scopes": [
      "files:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "userGuid",
        "in": "path",
        "required": true,
        "description": "GUID of the user used to get the files attached to travel expenses.",
        "type": "string"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch.",
        "type": "integer:int32"
      },
      {
        "name": "startDate",
        "in": "query",
        "required": false,
        "description": "Optional: Start date to from which to check travel expenses.",
        "type": "string:date-time"
      },
      {
        "name": "endDate",
        "in": "query",
        "required": false,
        "description": "Optional: End date to check for availability until travel expenses.",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<ProjectTravelExpenseFileModel>"
  },
  {
    "id": "Files_GetTravelExpenseFiles",
    "method": "GET",
    "path": "/v1/projecttravelexpenses/{projectTravelExpenseGuid}/files",
    "tag": "FilesRead",
    "summary": "Get all files of a travel expense by its id.",
    "scopes": [
      "files:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectTravelExpenseGuid",
        "in": "path",
        "required": true,
        "description": "GUID of the travel expense used to get the files.",
        "type": "string"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch.",
        "type": "integer:int32"
      }
    ],
    "responseSchema": "array<ProjectTravelExpenseFileModel>"
  },
  {
    "id": "Files_GetTravelExpenseFile",
    "method": "GET",
    "path": "/v1/projecttravelexpensefiles/{guid}",
    "tag": "FilesRead",
    "summary": "Get travel expense file by ID.",
    "scopes": [
      "files:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the travel expense file.",
        "type": "string"
      }
    ],
    "responseSchema": "ProjectTravelExpenseFileModel"
  },
  {
    "id": "Flextime_GetFlextime",
    "method": "GET",
    "path": "/v1/users/{userGuid}/flextime",
    "tag": "UsersRead",
    "summary": "Get the flextime balance for a user for a specified date. Total balance is returned for the given date. Month balance is the balance for the month of the given date.\nValues are returned only if the advanced time tracking add-on is active.",
    "scopes": [
      "users:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "userGuid",
        "in": "path",
        "required": true,
        "description": "Id of the user.",
        "type": "string"
      },
      {
        "name": "eventDate",
        "in": "query",
        "required": false,
        "description": "Date for which to get the balance. Max 12 months into the future.",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "FlextimeModel"
  },
  {
    "id": "FormattingCultures_GetFormattingCulture",
    "method": "GET",
    "path": "/v1/localization/formattingcultures/{guid}",
    "tag": "SettingsRead",
    "summary": "Get formatting culture by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the formatting culture.",
        "type": "string"
      }
    ],
    "responseSchema": "FormattingCultureModel"
  },
  {
    "id": "HeartBeat_GetServerStatus",
    "method": "GET",
    "path": "/heartbeat/server",
    "tag": "NoScope",
    "summary": "Can be used to check the status of the REST Api.",
    "description": "This does not require authentication.",
    "scopes": [],
    "risk": "read",
    "parameters": []
  },
  {
    "id": "HeartBeat_GetDatabaseStatus",
    "method": "GET",
    "path": "/heartbeat/database",
    "tag": "NoScope",
    "summary": "Can be used to check the status of the database.",
    "description": "This does not require authentication.",
    "scopes": [],
    "risk": "read",
    "parameters": []
  },
  {
    "id": "HeartBeat_GetAuthorization",
    "method": "GET",
    "path": "/heartbeat/authorized",
    "tag": "NoScope",
    "summary": "Returns http status code 204 for successful authentication.",
    "description": "This route requires authentication, returns 204 http status when successful.",
    "scopes": [],
    "risk": "read",
    "parameters": []
  },
  {
    "id": "Holidays_GetHolidays",
    "method": "GET",
    "path": "/v1/holidays",
    "tag": "SettingsRead",
    "summary": "Get holidays.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "year",
        "in": "query",
        "required": false,
        "description": "Optional: Holidays for this year only. Default: all years.",
        "type": "integer:int32"
      },
      {
        "name": "countryGuid",
        "in": "query",
        "required": false,
        "description": "Optional: Holidays for this country only. Default local.",
        "type": "string"
      }
    ],
    "responseSchema": "array<HolidayModel>"
  },
  {
    "id": "Holidays_GetHolidaysByTimePeriod",
    "method": "GET",
    "path": "/v1/holidaysbytimeperiod",
    "tag": "SettingsRead",
    "summary": "Get holidays with start and end date.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "startDate",
        "in": "query",
        "required": false,
        "description": "Start date for holidays.",
        "type": "string:date-time"
      },
      {
        "name": "endDate",
        "in": "query",
        "required": false,
        "description": "End date for holidays.",
        "type": "string:date-time"
      },
      {
        "name": "countryGuid",
        "in": "query",
        "required": false,
        "description": "Optional: Holidays for this country only. Default local.",
        "type": "string"
      }
    ],
    "responseSchema": "array<HolidayModel>"
  },
  {
    "id": "Industries_GetIndustries",
    "method": "GET",
    "path": "/v1/industries",
    "tag": "SettingsRead",
    "summary": "Get all the industries.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all industries, if given as true return only active industries, if given as false returns only inactive industries.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from industry name.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<IndustryModel>"
  },
  {
    "id": "Industries_PostIndustry",
    "method": "POST",
    "path": "/v1/industries",
    "tag": "SettingsWrite",
    "summary": "Insert an industry.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "IndustryModel",
    "responseSchema": "IndustryModel"
  },
  {
    "id": "Industries_GetIndustry",
    "method": "GET",
    "path": "/v1/industries/{guid}",
    "tag": "SettingsRead",
    "summary": "Get industry by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the industry.",
        "type": "string"
      }
    ],
    "responseSchema": "IndustryModel"
  },
  {
    "id": "Industries_PatchIndustry",
    "method": "PATCH",
    "path": "/v1/industries/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) an industry or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the industry.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<IndustryModel>"
  },
  {
    "id": "Industries_DeleteIndustry",
    "method": "DELETE",
    "path": "/v1/industries/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete an industry.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if industry can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the industry to delete.",
        "type": "string"
      },
      {
        "name": "moveUsagesToGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the industry to which to move usages of this industry. Default null. If industry is in use and usages aren't moved the deletion might fail.",
        "type": "string"
      }
    ]
  },
  {
    "id": "Invoices_GetInvoice",
    "method": "GET",
    "path": "/v1/invoices/{guid}",
    "tag": "InvoicesRead",
    "summary": "Get invoice by ID",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID of the invoice.",
        "type": "string"
      }
    ],
    "responseSchema": "InvoiceOutputModel"
  },
  {
    "id": "Invoices_PatchInvoice",
    "method": "PATCH",
    "path": "/v1/invoices/{guid}",
    "tag": "InvoicesWrite",
    "summary": "Update (Patch) an invoice or a part of it",
    "scopes": [
      "invoices:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID of the invoice",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<InvoiceOutputModel>"
  },
  {
    "id": "Invoices_DeleteInvoice",
    "method": "DELETE",
    "path": "/v1/invoices/{guid}",
    "tag": "InvoicesDelete",
    "summary": "Delete an invoice.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if cost center can't be found.",
    "scopes": [
      "invoices:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the invoice to delete.",
        "type": "string"
      }
    ]
  },
  {
    "id": "Invoices_DeleteProjectFromInvoice",
    "method": "DELETE",
    "path": "/v1/invoices/{guid}/projects/{projectGuid}",
    "tag": "InvoicesDelete",
    "summary": "Delete a project from invoice.",
    "scopes": [
      "invoices:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "The invoice GUID.",
        "type": "string"
      },
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "The project GUID.",
        "type": "string"
      }
    ]
  },
  {
    "id": "InvoiceStatuses_GetInvoiceStatuses",
    "method": "GET",
    "path": "/v1/invoicestatuses",
    "tag": "SettingsRead",
    "summary": "Get invoice statuses.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "Filter the invoice statuses. If true/false, only the active/inactive ones are returned. If null, all the invoice statuses are returned.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from invoice status name.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=Name&sortings[0].value=Desc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<InvoiceStatusModel>"
  },
  {
    "id": "InvoiceStatuses_PostInvoiceStatus",
    "method": "POST",
    "path": "/v1/invoicestatuses",
    "tag": "SettingsWrite",
    "summary": "Insert a invoice status.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "InvoiceStatusModel",
    "responseSchema": "InvoiceStatusModel"
  },
  {
    "id": "InvoiceStatuses_GetInvoiceStatus",
    "method": "GET",
    "path": "/v1/invoicestatuses/{guid}",
    "tag": "SettingsRead",
    "summary": "Get Invoice status by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the Invoice status.",
        "type": "string"
      }
    ],
    "responseSchema": "InvoiceStatusModel"
  },
  {
    "id": "InvoiceStatuses_PatchInvoiceStatus",
    "method": "PATCH",
    "path": "/v1/invoicestatuses/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) an Invoice status or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the Invoice status.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<InvoiceStatusModel>"
  },
  {
    "id": "InvoiceStatuses_DeleteInvoiceStatus",
    "method": "DELETE",
    "path": "/v1/invoicestatuses/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete an invoice status.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if invoice status can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the invoice status to delete.",
        "type": "string"
      }
    ]
  },
  {
    "id": "InvoiceTemplates_GetInvoiceTemplates",
    "method": "GET",
    "path": "/v1/invoicetemplates",
    "tag": "SettingsRead",
    "summary": "Get invoice templates.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<InvoiceTemplateModel>"
  },
  {
    "id": "InvoiceTemplates_GetInvoiceTemplate",
    "method": "GET",
    "path": "/v1/invoicetemplates/{guid}",
    "tag": "SettingsRead",
    "summary": "Get invoice template by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the invoice template.",
        "type": "string"
      }
    ],
    "responseSchema": "InvoiceTemplateModel"
  },
  {
    "id": "Pdf_GetInvoicePdf",
    "method": "GET",
    "path": "/v1/invoices/{guid}/pdf",
    "tag": "FilesRead",
    "summary": "Get an invoice PDF.",
    "scopes": [
      "files:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "The invoice GUID.",
        "type": "string"
      },
      {
        "name": "invoiceType",
        "in": "query",
        "required": false,
        "description": "Optional: type of invoice.",
        "type": "InvoiceType"
      },
      {
        "name": "pdfGetOptions",
        "in": "query",
        "required": false,
        "description": "Optional: what to include in the PDF. Defaults to InvoicePdfGetOptions.All.",
        "type": "InvoicePdfGetOptions"
      }
    ],
    "responseSchema": "string:binary"
  },
  {
    "id": "Pdf_GetProposalPdf",
    "method": "GET",
    "path": "/v1/proposals/{guid}/pdf",
    "tag": "ProjectsRead",
    "summary": "Get a proposal PDF.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "The proposal GUID.",
        "type": "string"
      }
    ],
    "responseSchema": "string:binary"
  },
  {
    "id": "Pdf_GetTravelReimbursementPdf",
    "method": "GET",
    "path": "/v1/travelreimbursements/{guid}/pdf",
    "tag": "FilesRead",
    "summary": "Get a travel reimbursement PDF.",
    "scopes": [
      "files:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "The travel reimbursement GUID.",
        "type": "string"
      }
    ],
    "responseSchema": "string:binary"
  },
  {
    "id": "PermissionProfiles_GetPermissionProfiles",
    "method": "GET",
    "path": "/v1/permissionprofiles",
    "tag": "SettingsRead",
    "summary": "Get the Permission Profiles.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all Permission Profiles, if given as true return only active Permission Profiles, if given as false returns only inactive Permission Profiles.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from permission profile name.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=name&sortings[0].value=Asc&sortings[1].key=isActive&sortings[1].value=Asc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<PermissionProfileModel>"
  },
  {
    "id": "PermissionProfiles_GetPermissionProfile",
    "method": "GET",
    "path": "/v1/permissionprofiles/{guid}",
    "tag": "SettingsRead",
    "summary": "Get Permission Profile by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the Permission Profile.",
        "type": "string"
      }
    ],
    "responseSchema": "PermissionProfileModel"
  },
  {
    "id": "PriceLists_GetPriceList",
    "method": "GET",
    "path": "/v1/pricelists/{guid}",
    "tag": "SettingsRead",
    "summary": "Get price list by GUID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID used to get the price list.",
        "type": "string"
      }
    ],
    "responseSchema": "PriceListModel"
  },
  {
    "id": "Keywords_GetKeywords",
    "method": "GET",
    "path": "/v1/keywords",
    "tag": "SettingsRead",
    "summary": "Get all the keywords.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "category",
        "in": "query",
        "required": false,
        "description": "Optional: category of the keyword.",
        "type": "KeywordCategory"
      },
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all Keywords, if given as true return only active Keywords, if given as false returns only inactive Keywords.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from keyword.",
        "type": "string"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get keywords that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      },
      {
        "name": "keyword",
        "in": "query",
        "required": false,
        "description": "Optional: Keyword name.",
        "type": "string"
      }
    ],
    "responseSchema": "array<KeywordModel>"
  },
  {
    "id": "Keywords_PostKeyword",
    "method": "POST",
    "path": "/v1/keywords",
    "tag": "SettingsWrite",
    "summary": "Insert a keyword.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "KeywordModel",
    "responseSchema": "KeywordModel"
  },
  {
    "id": "Keywords_GetKeyword",
    "method": "GET",
    "path": "/v1/keywords/{guid}",
    "tag": "SettingsRead",
    "summary": "Get keyword by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the keyword.",
        "type": "string"
      }
    ],
    "responseSchema": "KeywordModel"
  },
  {
    "id": "Keywords_PatchKeyword",
    "method": "PATCH",
    "path": "/v1/keywords/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a keyword or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the keyword.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<KeywordModel>"
  },
  {
    "id": "Keywords_DeleteKeyword",
    "method": "DELETE",
    "path": "/v1/keywords/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete keyword by ID. It will also be deleted from any entity it is used in (Project, etc.)",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the keyword.",
        "type": "string"
      },
      {
        "name": "moveUsagesToGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the keyword to which to move usages of this keyword. Default null. If keyword is in use and usages aren't moved the deletion might fail.",
        "type": "string"
      }
    ]
  },
  {
    "id": "Keywords_GetContactKeywords",
    "method": "GET",
    "path": "/v1/contacts/{contactGuid}/keywords",
    "tag": "CustomersRead",
    "summary": "Get all the keywords for contact.",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "contactGuid",
        "in": "path",
        "required": true,
        "description": "ID of the user whose keywords are requested.",
        "type": "string"
      },
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all Keywords, if given as true return only active Keywords, if given as false returns only inactive Keywords.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=Keyword&sortings[0].value=Desc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<KeywordModel>"
  },
  {
    "id": "Keywords_GetProjectKeywords",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/keywords",
    "tag": "ProjectsRead",
    "summary": "Get all the keywords for project.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "ID of the project for which keywords are requested.",
        "type": "string"
      },
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all Keywords, if given as true return only active Keywords, if given as false returns only inactive Keywords.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=Keyword&sortings[0].value=Desc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<ProjectKeywordModel>"
  },
  {
    "id": "Keywords_GetFileKeywords",
    "method": "GET",
    "path": "/v1/files/{fileGuid}/keywords",
    "tag": "FilesRead",
    "summary": "Get all the keywords for file.",
    "scopes": [
      "files:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "fileGuid",
        "in": "path",
        "required": true,
        "description": "ID of the file for which keywords are requested.",
        "type": "string"
      },
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all Keywords, if given as true return only active Keywords, if given as false returns only inactive Keywords.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=Keyword&sortings[0].value=Desc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<FileKeywordModel>"
  },
  {
    "id": "Keywords_GetUserKeywords",
    "method": "GET",
    "path": "/v1/users/{userGuid}/keywords",
    "tag": "UsersRead",
    "summary": "Get all the keywords for user.",
    "scopes": [
      "users:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "userGuid",
        "in": "path",
        "required": true,
        "description": "ID of the user for who keywords are requested.",
        "type": "string"
      },
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all Keywords, if given as true return only active Keywords, if given as false returns only inactive Keywords.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=Keyword&sortings[0].value=Desc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<UserKeywordModel>"
  },
  {
    "id": "KpiFormulas_GetKpiFormulas",
    "method": "GET",
    "path": "/v1/kpiformulas",
    "tag": "SettingsRead",
    "summary": "Get saved KPI formulas.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "category",
        "in": "query",
        "required": false,
        "description": "Optional: Category of KPI formula (Project, Invoice, User).",
        "type": "KpiFormulaCategory"
      },
      {
        "name": "isActive",
        "in": "query",
        "required": false,
        "description": "Optional: return with given active status. Default is to return all.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search.",
        "type": "string"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=Name&sortings[0].value=Desc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      },
      {
        "name": "includeDefinition",
        "in": "query",
        "required": false,
        "description": "Optional: Include definition to response. Default false.",
        "type": "boolean"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get KPI formulas that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<KpiFormulaModelBase>"
  },
  {
    "id": "LeadSources_GetLeadSources",
    "method": "GET",
    "path": "/v1/leadsources",
    "tag": "SettingsRead",
    "summary": "Get the lead sources.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all lead sources, if given as true return only active lead sources, if given as false returns only inactive lead sources.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from lead source name.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<LeadSourceModel>"
  },
  {
    "id": "LeadSources_PostLeadSource",
    "method": "POST",
    "path": "/v1/leadsources",
    "tag": "SettingsWrite",
    "summary": "Insert a lead source.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "LeadSourceModel",
    "responseSchema": "LeadSourceModel"
  },
  {
    "id": "LeadSources_GetLeadSource",
    "method": "GET",
    "path": "/v1/leadsources/{guid}",
    "tag": "SettingsRead",
    "summary": "Get lead source by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the lead source.",
        "type": "string"
      }
    ],
    "responseSchema": "LeadSourceModel"
  },
  {
    "id": "LeadSources_PatchLeadSource",
    "method": "PATCH",
    "path": "/v1/leadsources/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) an lead source or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the lead source.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<LeadSourceModel>"
  },
  {
    "id": "LeadSources_DeleteLeadSource",
    "method": "DELETE",
    "path": "/v1/leadsources/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete a lead source.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if lead source can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the lead source to delete.",
        "type": "string"
      },
      {
        "name": "moveUsagesToGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the lead source to which to move usages of this lead source. Default null. If industry is in use and usages aren't moved the deletion might fail.",
        "type": "string"
      }
    ]
  },
  {
    "id": "MarketSegments_GetMarketSegments",
    "method": "GET",
    "path": "/v1/marketsegments",
    "tag": "SettingsRead",
    "summary": "Get the Market Segments.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all Market Segments, if given as true return only active Market Segments, if given as false returns only inactive Market Segments.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from market segment name.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "includeChildSegments",
        "in": "query",
        "required": false,
        "description": "Optional: Include also child market segments. If false returns only parent segments. Default true.",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<MarketSegmentModel>"
  },
  {
    "id": "MarketSegments_PostMarketSegment",
    "method": "POST",
    "path": "/v1/marketsegments",
    "tag": "SettingsWrite",
    "summary": "Insert a market segment.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "MarketSegmentModel",
    "responseSchema": "MarketSegmentModel"
  },
  {
    "id": "MarketSegments_GetMarketSegment",
    "method": "GET",
    "path": "/v1/marketsegments/{guid}",
    "tag": "SettingsRead",
    "summary": "Get Market Segment by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the Market Segment.",
        "type": "string"
      }
    ],
    "responseSchema": "MarketSegmentModel"
  },
  {
    "id": "MarketSegments_PatchMarketSegment",
    "method": "PATCH",
    "path": "/v1/marketsegments/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) an Market Segment or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the Market Segment.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<MarketSegmentModel>"
  },
  {
    "id": "MarketSegments_DeleteMarketSegment",
    "method": "DELETE",
    "path": "/v1/marketsegments/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete a market segment.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if market segment can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the market segment to delete.",
        "type": "string"
      },
      {
        "name": "moveUsagesToGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the lead source to which to move usages of this market segment. Default null.",
        "type": "string"
      }
    ]
  },
  {
    "id": "OrganizationSettings_GetOrganizationSettings",
    "method": "GET",
    "path": "/v1/organizationsettings",
    "tag": "OrganizationRead",
    "summary": "Get the settings of organization.",
    "scopes": [
      "organization:read"
    ],
    "risk": "read",
    "parameters": [],
    "responseSchema": "OrganizationSettingsModel"
  },
  {
    "id": "ProductCategories_GetProductCategories",
    "method": "GET",
    "path": "/v1/productcategories",
    "tag": "SettingsRead",
    "summary": "Get product categories.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all Product categories, if given as true return only active Product categories, if given as false returns only inactive Product categories.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default all.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from product category name or code.",
        "type": "string"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get product categories that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: ?sortings[0].key=Name&sortings[0].value=Desc &sortings[1].key=Code&sortings[1].value=Asc.",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<ProductCategoryModel>"
  },
  {
    "id": "ProductCategories_PostProductCategory",
    "method": "POST",
    "path": "/v1/productcategories",
    "tag": "SettingsWrite",
    "summary": "Insert a product category.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProductCategoryModel",
    "responseSchema": "ProductCategoryModel"
  },
  {
    "id": "ProductCategories_GetProductCategory",
    "method": "GET",
    "path": "/v1/productcategories/{guid}",
    "tag": "SettingsRead",
    "summary": "Get product category by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the product category.",
        "type": "string"
      }
    ],
    "responseSchema": "ProductCategoryModel"
  },
  {
    "id": "ProductCategories_PatchProductCategory",
    "method": "PATCH",
    "path": "/v1/productcategories/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a product category or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the product category.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProductCategoryModel>"
  },
  {
    "id": "ProductCategories_DeleteProductCategory",
    "method": "DELETE",
    "path": "/v1/productcategories/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete a product category.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if product category can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the product category to delete.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ProjectWorkTypes_GetProjectWorktypes",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/projectworktypes",
    "tag": "ProjectsRead",
    "summary": "Get project work types.",
    "description": "This is the same as organization's list of work types, unless the project has some specific work types and \"UseWorktypesFromSetting\" in project model is set to false.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "GUID of the project.",
        "type": "string"
      },
      {
        "name": "includeWorktypesFromRegistry",
        "in": "query",
        "required": false,
        "description": "Include work types also from registry. If false, returns only project specific work types. Default false.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all work types, if given as true return only active work types, if given as false returns only inactive work types.",
        "type": "boolean"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from work type name.",
        "type": "string"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get project work types that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<ProjectWorkTypeModel>"
  },
  {
    "id": "ProjectWorkTypes_PostProjectWorktype",
    "method": "POST",
    "path": "/v1/projectworktypes",
    "tag": "ProjectsWrite",
    "summary": "Adds a work type to a project.",
    "description": "The \"UseWorktypesFromSetting\" flag for the Project should be false (the project should not use the organization list of work types).",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProjectWorkTypeModel",
    "responseSchema": "ProjectWorkTypeModel"
  },
  {
    "id": "ProjectWorkTypes_PatchProjectWorktype",
    "method": "PATCH",
    "path": "/v1/projectworktypes/{guid}",
    "tag": "ProjectsWrite",
    "summary": "Update (patch) a project work type.",
    "description": "This currently can be used only to change the default work type in a project. The \"UseWorktypesFromSetting\" flag for the Project should be false (the project should not use the organization list of work types).",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the project work type.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProjectWorkTypeModel>"
  },
  {
    "id": "ProjectWorkTypes_DeleteProjectWorktype",
    "method": "DELETE",
    "path": "/v1/projectworktypes/{guid}",
    "tag": "ProjectsDelete",
    "summary": "Deletes a project work type.",
    "description": "Returns: No Content (204) if succeeded. The \"UseWorktypesFromSetting\" flag for the Project should be false (the project should not use the organization list of work types).",
    "scopes": [
      "projects:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID of the project work type to remove.",
        "type": "string"
      }
    ]
  },
  {
    "id": "SalesAccounts_GetSalesAccounts",
    "method": "GET",
    "path": "/v1/salesaccounts",
    "tag": "SettingsRead",
    "summary": "Get sales accounts.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all Sales accounts, if given as true return only active Sales accounts, if given as false returns only inactive Sales accounts.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from cost account name or identifier.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=Name&sortings[0].value=Desc &sortings[1].key=Identifier&sortings[1].value=Asc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<SalesAccountModel>"
  },
  {
    "id": "SalesAccounts_PostSalesAccount",
    "method": "POST",
    "path": "/v1/salesaccounts",
    "tag": "SettingsWrite",
    "summary": "Insert a sales account.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "SalesAccountModel",
    "responseSchema": "SalesAccountModel"
  },
  {
    "id": "SalesAccounts_GetSalesAccount",
    "method": "GET",
    "path": "/v1/salesaccounts/{guid}",
    "tag": "SettingsRead",
    "summary": "Get sales account by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the sales account.",
        "type": "string"
      }
    ],
    "responseSchema": "SalesAccountModel"
  },
  {
    "id": "SalesAccounts_PatchSalesAccount",
    "method": "PATCH",
    "path": "/v1/salesaccounts/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a sales account or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the sales account.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<SalesAccountModel>"
  },
  {
    "id": "SalesAccounts_DeleteSalesAccount",
    "method": "DELETE",
    "path": "/v1/salesaccounts/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete a sales account.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if sales account can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the sales account to delete.",
        "type": "string"
      }
    ]
  },
  {
    "id": "SalesStatusTypes_GetSalesStatusType",
    "method": "GET",
    "path": "/v1/salesstatustypes/{guid}",
    "tag": "SettingsRead",
    "summary": "Get sales status type by ID",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the sales status type.",
        "type": "string"
      }
    ],
    "responseSchema": "SalesStatusTypeOutputModel"
  },
  {
    "id": "SalesStatusTypes_PatchSalesStatusType",
    "method": "PATCH",
    "path": "/v1/salesstatustypes/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) an sales status type or a part of it",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the sales status type",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<SalesStatusTypeOutputModel>"
  },
  {
    "id": "SalesStatusTypes_DeleteSalesStatusType",
    "method": "DELETE",
    "path": "/v1/salesstatustypes/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete an sales status type.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if sales status type can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the sales status type to delete.",
        "type": "string"
      },
      {
        "name": "moveUsagesToGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the sales status type to which to move usages of this sales status type. Default null. If sales status type is in use and usages aren't moved the deletion might fail.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ActivityParticipants_GetActivityParticipants",
    "method": "GET",
    "path": "/v1/activities/{activityGuid}/activityparticipants",
    "tag": "ActivitiesRead",
    "summary": "Get participants for an activity",
    "scopes": [
      "activities:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "activityGuid",
        "in": "path",
        "required": true,
        "description": "ID of the activity",
        "type": "string"
      }
    ],
    "responseSchema": "array<ActivityParticipantModel>"
  },
  {
    "id": "ActivityParticipants_GetActivityParticipant",
    "method": "GET",
    "path": "/v1/activityparticipants/{guid}",
    "tag": "ActivitiesRead",
    "summary": "Get activity participant",
    "scopes": [
      "activities:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the participant",
        "type": "string"
      }
    ],
    "responseSchema": "ActivityParticipantModel"
  },
  {
    "id": "ActivityParticipants_PatchActivityParticipants",
    "method": "PATCH",
    "path": "/v1/activityparticipants/{guid}",
    "tag": "ActivitiesWrite",
    "summary": "Update (Patch) a activity participant or a part of it",
    "description": "Only IsConfirmed property can be updated.",
    "scopes": [
      "activities:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the activity participant",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ActivityParticipantModel>"
  },
  {
    "id": "ActivityParticipants_PostActivityParticipant",
    "method": "POST",
    "path": "/v1/activityparticipants",
    "tag": "ActivitiesWrite",
    "summary": "Adds an activity participant",
    "scopes": [
      "activities:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ActivityParticipantModel",
    "responseSchema": "ActivityParticipantModel"
  },
  {
    "id": "ActivityParticipants_DeleteActivityParticipant",
    "method": "DELETE",
    "path": "/v1/activities/{activityGuid}/activityparticipants/{activityParticipantGuid}",
    "tag": "ActivitiesDelete",
    "summary": "Delete activity participant.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if participant can't be found.",
    "scopes": [
      "activities:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "activityGuid",
        "in": "path",
        "required": true,
        "description": "ID of the activity from which to delete the participant. If an activity occurrence guid is given, this will create an exception to the recurring activity and delete the participant from that.",
        "type": "string"
      },
      {
        "name": "activityParticipantGuid",
        "in": "path",
        "required": true,
        "description": "ID of the participant",
        "type": "string"
      }
    ]
  },
  {
    "id": "Guids_ConvertGuid",
    "method": "GET",
    "path": "/v1/guids/convert/{guid}",
    "tag": "SettingsRead",
    "summary": "Convert a GUID format from legacy (SOAP) to new (REST).",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID to convert",
        "type": "string"
      }
    ],
    "responseSchema": "GuidConversionModel"
  },
  {
    "id": "Guids_ConvertGuids",
    "method": "POST",
    "path": "/v1/guids/convert",
    "tag": "SettingsRead",
    "summary": "Convert a batch of GUIDs format from legacy (SOAP) to new (REST).",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [],
    "requestSchema": "array",
    "responseSchema": "array<GuidConversionModel>"
  },
  {
    "id": "Countries_GetCountryByCode2",
    "method": "GET",
    "path": "/v1/localization/countries/{code2}",
    "tag": "SettingsRead",
    "summary": "Get a country by ISO Alpha-2 code",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "code2",
        "in": "path",
        "required": true,
        "description": "Optional: ISO Alpha-2 code used to get a country.",
        "type": "string"
      }
    ],
    "responseSchema": "array<CountryModel>"
  },
  {
    "id": "Countries_GetCountryByCode3",
    "method": "GET",
    "path": "/v1/localization/countries/{code3}",
    "tag": "SettingsRead",
    "summary": "Get a country by ISO Alpha-3 code",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "code3",
        "in": "path",
        "required": true,
        "description": "Optional: ISO Alpha-3 code used to get a country.",
        "type": "string"
      }
    ],
    "responseSchema": "array<CountryModel>"
  },
  {
    "id": "Countries_GetCountryByName",
    "method": "GET",
    "path": "/v1/localization/countries/{countryName}",
    "tag": "SettingsRead",
    "summary": "Get a country by name",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "countryName",
        "in": "path",
        "required": true,
        "description": "Optional: English country name.",
        "type": "string"
      }
    ],
    "responseSchema": "array<CountryModel>"
  },
  {
    "id": "CustomerCountrySettings_GetCustomerCountrySettings",
    "method": "GET",
    "path": "/v1/customers/{customerGuid}/customercountrysettings",
    "tag": "CustomersRead",
    "summary": "Get all the country settings for a customer.",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "customerGuid",
        "in": "path",
        "required": true,
        "description": "GUID of the customer.",
        "type": "string"
      }
    ],
    "responseSchema": "array<CustomerCountrySettingsOutputModel>"
  },
  {
    "id": "CustomerCountrySettings_PostCustomerCountrySettings",
    "method": "POST",
    "path": "/v1/customercountrysettings",
    "tag": "CustomersWrite",
    "summary": "Insert a customer country setting.",
    "scopes": [
      "customers:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "CustomerCountrySettingsInputModel",
    "responseSchema": "CustomerCountrySettingsOutputModel"
  },
  {
    "id": "CustomerCountrySettings_PatchCustomerCountrySettings",
    "method": "PATCH",
    "path": "/v1/customercountrysettings/{guid}",
    "tag": "CustomersWrite",
    "summary": "Update (Patch) a customer country setting.",
    "scopes": [
      "customers:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the customer country setting.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<CustomerCountrySettingsOutputModel>"
  },
  {
    "id": "CustomerCountrySettings_DeleteCustomerCountrySetting",
    "method": "DELETE",
    "path": "/v1/customercountrysettings/{guid}",
    "tag": "CustomersDelete",
    "summary": "Deletes a customer country setting.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if customer country setting can't be found.",
    "scopes": [
      "customers:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the customer country setting.",
        "type": "string"
      }
    ]
  },
  {
    "id": "CustomerCustomPropertySelectionItems_GetCustomerCustomPropertySelectionItems",
    "method": "GET",
    "path": "/v1/customers/customproperties/{customPropertyGuid}/customercustompropertyselectionitems",
    "tag": "SettingsRead",
    "summary": "Get the customer custom properties.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "customPropertyGuid",
        "in": "path",
        "required": true,
        "description": "Custom property id used to get the customer custom property selection items.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "isActive",
        "in": "query",
        "required": false,
        "description": "Optional: Get only active or inactive selection items.",
        "type": "boolean"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get custom property selection items that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<CustomerCustomPropertySelectionItemOutputModel>"
  },
  {
    "id": "CustomerCustomPropertySelectionItems_GetCustomerCustomPropertySelectionItem",
    "method": "GET",
    "path": "/v1/customers/customproperties/customercustompropertyselectionitems/{guid}",
    "tag": "SettingsRead",
    "summary": "Get customer custom property selection item by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the customer custom property selection item.",
        "type": "string"
      }
    ],
    "responseSchema": "CustomerCustomPropertySelectionItemOutputModel"
  },
  {
    "id": "CustomerCustomPropertySelectionItems_PatchCustomerCustomPropertySelectionItem",
    "method": "PATCH",
    "path": "/v1/customers/customproperties/customercustompropertyselectionitems/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a customer custom property selection item or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the customer custom property selection item.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<CustomerCustomPropertySelectionItemOutputModel>"
  },
  {
    "id": "CustomerCustomPropertySelectionItems_DeleteCustomerCustomPropertySelectionItem",
    "method": "DELETE",
    "path": "/v1/customers/customproperties/customercustompropertyselectionitems/{guid}",
    "tag": "SettingsDelete",
    "summary": "Deletes a customer custom property selection item.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the customer custom property selection item.",
        "type": "string"
      }
    ]
  },
  {
    "id": "CustomerCustomPropertySelectionItems_PostCustomerCustomPropertySelectionItem",
    "method": "POST",
    "path": "/v1/customers/customproperties/customercustompropertyselectionitems",
    "tag": "SettingsWrite",
    "summary": "Insert a customer custom property selection item.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "CustomerCustomPropertySelectionItemInputModel",
    "responseSchema": "CustomerCustomPropertySelectionItemOutputModel"
  },
  {
    "id": "Finvoices_GetFinvoicesByInvoiceStatus",
    "method": "GET",
    "path": "/v1/invoicestatuses/{invoiceStatusGuid}/finvoices",
    "tag": "InvoicesRead",
    "summary": "Finvoices_GetFinvoicesByInvoiceStatus",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "invoiceStatusGuid",
        "in": "path",
        "required": true,
        "type": "string"
      }
    ],
    "responseSchema": "string:binary"
  },
  {
    "id": "Finvoices_GetFinvoiceByInvoiceGuid",
    "method": "GET",
    "path": "/v1/invoices/{invoiceGuid}/finvoice",
    "tag": "InvoicesRead",
    "summary": "Finvoices_GetFinvoiceByInvoiceGuid",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "invoiceGuid",
        "in": "path",
        "required": true,
        "type": "string"
      }
    ]
  },
  {
    "id": "FlatRates_GetAllFlatRates",
    "method": "GET",
    "path": "/v1/flatrates",
    "tag": "FeesRead",
    "summary": "Get all flat rates",
    "scopes": [
      "fees:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: Page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get flat rates that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "invoiceGuid",
        "in": "query",
        "required": false,
        "description": "Optional: Get flat rates by invoice guid. Default all.",
        "type": "string"
      }
    ],
    "responseSchema": "array<FlatRateOutputModel>"
  },
  {
    "id": "FlatRates_PostFlatRate",
    "method": "POST",
    "path": "/v1/flatrates",
    "tag": "FeesWrite",
    "summary": "Insert a flat rate.",
    "scopes": [
      "fees:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "FlatRateInputModel",
    "responseSchema": "FlatRateOutputModel"
  },
  {
    "id": "FlextimeAdjustments_GetFlextimeAdjustments",
    "method": "GET",
    "path": "/v1/users/{userGuid}/flextimeadjustments",
    "tag": "UsersRead",
    "summary": "Get the Flextime Adjustments.",
    "scopes": [
      "users:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "userGuid",
        "in": "path",
        "required": true,
        "description": "ID of the user for whom to get the adjustments.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      }
    ],
    "responseSchema": "array<FlextimeAdjustmentOutputModel>"
  },
  {
    "id": "FlextimeAdjustments_GetFlextimeAdjustment",
    "method": "GET",
    "path": "/v1/flextimeadjustments/{guid}",
    "tag": "UsersRead",
    "summary": "Get Flextime Adjustment by ID.",
    "scopes": [
      "users:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the Flextime Adjustment.",
        "type": "string"
      }
    ],
    "responseSchema": "FlextimeAdjustmentOutputModel"
  },
  {
    "id": "FlextimeAdjustments_PatchFlextimeAdjustment",
    "method": "PATCH",
    "path": "/v1/flextimeadjustments/{guid}",
    "tag": "UsersWrite",
    "summary": "Update (Patch) an Flextime Adjustment or a part of it.",
    "scopes": [
      "users:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the Flextime Adjustment.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<FlextimeAdjustmentOutputModel>"
  },
  {
    "id": "FlextimeAdjustments_DeleteFlextimeAdjustment",
    "method": "DELETE",
    "path": "/v1/flextimeadjustments/{guid}",
    "tag": "UsersWrite",
    "summary": "Delete an flextime adjustment.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if flextime adjustment can't be found.",
    "scopes": [
      "users:write"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the flextime adjustment to delete.",
        "type": "string"
      }
    ]
  },
  {
    "id": "FlextimeAdjustments_PostFlextimeAdjustment",
    "method": "POST",
    "path": "/v1/flextimeadjustments",
    "tag": "UsersWrite",
    "summary": "Insert a flextime adjustment.",
    "scopes": [
      "users:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "FlextimeAdjustmentInputModel",
    "responseSchema": "FlextimeAdjustmentOutputModel"
  },
  {
    "id": "FormattingCultures_GetFormattings",
    "method": "GET",
    "path": "/v1/localization/formattingcultures",
    "tag": "SettingsRead",
    "summary": "Get all the Formatting Cultures",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [],
    "responseSchema": "array<FormattingCultureModel>"
  },
  {
    "id": "Keywords_LinkKeywordToUser",
    "method": "POST",
    "path": "/v1/users/{userGuid}/keywords/{guid}",
    "tag": "UsersWrite",
    "summary": "Link existing keyword to user",
    "scopes": [
      "users:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "userGuid",
        "in": "path",
        "required": true,
        "type": "string"
      },
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "type": "string"
      }
    ],
    "responseSchema": "UserKeywordModel"
  },
  {
    "id": "Keywords_DeleteUserKeyword",
    "method": "DELETE",
    "path": "/v1/users/{userGuid}/keywords/{guid}",
    "tag": "UsersDelete",
    "summary": "Delete a keyword from the user",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if the keyword or the link can't be found.",
    "scopes": [
      "users:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "userGuid",
        "in": "path",
        "required": true,
        "type": "string"
      },
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "type": "string"
      }
    ]
  },
  {
    "id": "Keywords_LinkKeywordToProject",
    "method": "POST",
    "path": "/v1/projects/{projectGuid}/keywords/{guid}",
    "tag": "ProjectsWrite",
    "summary": "Link existing keyword to project",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "type": "string"
      },
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "type": "string"
      }
    ],
    "responseSchema": "ProjectKeywordModel"
  },
  {
    "id": "Keywords_DeleteProjectKeyword",
    "method": "DELETE",
    "path": "/v1/projects/{projectGuid}/keywords/{guid}",
    "tag": "ProjectsDelete",
    "summary": "Delete a keyword from the project",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if the keyword or the link can't be found.",
    "scopes": [
      "projects:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "type": "string"
      },
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "type": "string"
      }
    ]
  },
  {
    "id": "Keywords_LinkKeywordToContact",
    "method": "POST",
    "path": "/v1/contacts/{contactGuid}/keywords/{guid}",
    "tag": "CustomersWrite",
    "summary": "Link existing keyword to contact",
    "scopes": [
      "customers:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "contactGuid",
        "in": "path",
        "required": true,
        "type": "string"
      },
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "type": "string"
      }
    ],
    "responseSchema": "ContactKeywordModel"
  },
  {
    "id": "Keywords_DeleteContactKeyword",
    "method": "DELETE",
    "path": "/v1/contacts/{contactGuid}/keywords/{guid}",
    "tag": "CustomersDelete",
    "summary": "Delete a keyword from the contact",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if the keyword or the link can't be found.",
    "scopes": [
      "customers:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "contactGuid",
        "in": "path",
        "required": true,
        "type": "string"
      },
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "type": "string"
      }
    ]
  },
  {
    "id": "Keywords_LinkKeywordToFile",
    "method": "POST",
    "path": "/v1/files/{fileGuid}/keywords/{guid}",
    "tag": "FilesWrite",
    "summary": "Link existing keyword to file",
    "scopes": [
      "files:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "fileGuid",
        "in": "path",
        "required": true,
        "type": "string"
      },
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "type": "string"
      }
    ],
    "responseSchema": "FileKeywordModel"
  },
  {
    "id": "Keywords_DeleteFileKeyword",
    "method": "DELETE",
    "path": "/v1/files/{fileGuid}/keywords/{guid}",
    "tag": "FilesDelete",
    "summary": "Delete a keyword from the file",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if the keyword or the link can't be found.",
    "scopes": [
      "files:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "fileGuid",
        "in": "path",
        "required": true,
        "type": "string"
      },
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "type": "string"
      }
    ]
  },
  {
    "id": "ProjectCustomPropertySelectionItems_GetProjectCustomPropertySelectionItems",
    "method": "GET",
    "path": "/v1/projects/customproperties/{customPropertyGuid}/projectcustompropertyselectionitems",
    "tag": "SettingsRead",
    "summary": "Get the project custom properties.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "customPropertyGuid",
        "in": "path",
        "required": true,
        "description": "Custom property id used to get the project custom property selection items.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "isActive",
        "in": "query",
        "required": false,
        "description": "Optional: Get only active or inactive selection items.",
        "type": "boolean"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get custom property selection items that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<ProjectCustomPropertySelectionItemOutputModel>"
  },
  {
    "id": "ProjectCustomPropertySelectionItems_GetProjectCustomPropertySelectionItem",
    "method": "GET",
    "path": "/v1/projects/customproperties/projectcustompropertyselectionitems/{guid}",
    "tag": "SettingsRead",
    "summary": "Get project custom property selection item by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the project custom property selection item.",
        "type": "string"
      }
    ],
    "responseSchema": "ProjectCustomPropertySelectionItemOutputModel"
  },
  {
    "id": "ProjectCustomPropertySelectionItems_PatchProjectCustomPropertySelectionItem",
    "method": "PATCH",
    "path": "/v1/projects/customproperties/projectcustompropertyselectionitems/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a project custom property selection item or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the project custom property selection item.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProjectCustomPropertySelectionItemOutputModel>"
  },
  {
    "id": "ProjectCustomPropertySelectionItems_DeleteProjectCustomPropertySelectionItem",
    "method": "DELETE",
    "path": "/v1/projects/customproperties/projectcustompropertyselectionitems/{guid}",
    "tag": "SettingsDelete",
    "summary": "Deletes a project custom property selection item.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the project custom property selection item.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ProjectCustomPropertySelectionItems_PostProjectCustomPropertySelectionItem",
    "method": "POST",
    "path": "/v1/projects/customproperties/projectcustompropertyselectionitems",
    "tag": "SettingsWrite",
    "summary": "Insert a project custom property selection item.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProjectCustomPropertySelectionItemInputModel",
    "responseSchema": "ProjectCustomPropertySelectionItemOutputModel"
  },
  {
    "id": "CustomerCustomValues_GetCustomersCustomValues",
    "method": "GET",
    "path": "/v1/customers/customvalues",
    "tag": "CustomersRead",
    "summary": "Get the customer custom values.",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "isActive",
        "in": "query",
        "required": false,
        "description": "Optional: Get only values of active or inactive custom properties.",
        "type": "boolean"
      },
      {
        "name": "targets",
        "in": "query",
        "required": false,
        "description": "Optional: List of target for which to get the values.",
        "type": "array",
        "explode": true
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get custom values that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<CustomerCustomValueOutputModel>"
  },
  {
    "id": "CustomerCustomValues_PostCustomerCustomValue",
    "method": "POST",
    "path": "/v1/customers/customvalues",
    "tag": "CustomersWrite",
    "summary": "Insert a customer custom value.",
    "description": "Value depends on the custom property type. For selection type, it should be an array of objects containing key field as the value identifier. For other types it should be a single value.",
    "scopes": [
      "customers:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "CustomerCustomValueModel",
    "responseSchema": "array<CustomerCustomValueModel>"
  },
  {
    "id": "ProjectInvoiceSettings_GetProjectInvoiceSettings",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/projectinvoicesettings",
    "tag": "InvoicesRead",
    "summary": "Get project invoice settings by project ID.",
    "scopes": [
      "invoices:read",
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "ID of the project.",
        "type": "string"
      }
    ],
    "responseSchema": "array<ProjectInvoiceSettingsOutputModel>"
  },
  {
    "id": "ProjectInvoiceSettings_GetProjectInvoiceSetting",
    "method": "GET",
    "path": "/v1/projectinvoicesettings/{guid}",
    "tag": "InvoicesRead",
    "summary": "Get project invoice settings by ID.",
    "scopes": [
      "invoices:read",
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the project invoice settings.",
        "type": "string"
      }
    ],
    "responseSchema": "ProjectInvoiceSettingsOutputModel"
  },
  {
    "id": "ProjectInvoiceSettings_PatchProjectInvoiceSettings",
    "method": "PATCH",
    "path": "/v1/projectinvoicesettings/{guid}",
    "tag": "InvoicesWrite",
    "summary": "Update (Patch) project invoice settings.",
    "scopes": [
      "invoices:write",
      "projects:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the project invoice settings.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProjectInvoiceSettingsOutputModel>"
  },
  {
    "id": "ProjectInvoiceSettings_DeleteProjectInvoiceSettings",
    "method": "DELETE",
    "path": "/v1/projectinvoicesettings/{guid}",
    "tag": "InvoicesDelete",
    "summary": "Delete an project invoice settings.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if project invoice settings can't be found.",
    "scopes": [
      "invoices:delete",
      "projects:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the project invoice settings to delete.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ProjectInvoiceSettings_PostProjectInvoiceSettings",
    "method": "POST",
    "path": "/v1/projectinvoicesettings",
    "tag": "InvoicesWrite",
    "summary": "Create a new project invoice settings.",
    "scopes": [
      "invoices:write",
      "projects:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProjectInvoiceSettingsInputModel",
    "responseSchema": "ProjectInvoiceSettingsOutputModel"
  },
  {
    "id": "ProjectProducts_GetProjectProducts",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/projectproducts",
    "tag": "ProjectsRead",
    "summary": "Get project products",
    "description": "This is the same as organization's list of products, unless the project has some specific products and UseProductsFromSetting in project model is set to false.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "GUID of the project.",
        "type": "string"
      },
      {
        "name": "includeProductsFromRegistry",
        "in": "query",
        "required": false,
        "description": "Optional: Includes products available from product registry",
        "type": "boolean"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default all.",
        "type": "integer:int32"
      },
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "Fetch only active",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<ProjectProductOutputModel>"
  },
  {
    "id": "ProjectProducts_DeleteAllProjectProducts",
    "method": "DELETE",
    "path": "/v1/projects/{projectGuid}/projectproducts",
    "tag": "ProjectsDelete",
    "summary": "Deletes all project products of a project.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "projects:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "GUID of the project from where project products to remove.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ProjectProducts_PostProjectProduct",
    "method": "POST",
    "path": "/v1/projectproducts",
    "tag": "ProjectsWrite",
    "summary": "Adds a product to a project.",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProjectProductInputModel",
    "responseSchema": "ProjectProductOutputModel"
  },
  {
    "id": "ProjectWorkHourPrices_GetWorkHourPricesForProject",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/projectworkhourprices",
    "tag": "ProjectsRead",
    "summary": "Get all the work hour prices for a project",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "Guid of the project.",
        "type": "string"
      },
      {
        "name": "fromPricelistOnly",
        "in": "query",
        "required": false,
        "description": "If true return only prices from the price list, if false also returns prices from the products. Default is false.",
        "type": "boolean"
      },
      {
        "name": "isAvailable",
        "in": "query",
        "required": false,
        "description": "Optional: If true, returns only prices that are available for the project, false returns price that are not available. Default all.",
        "type": "boolean"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get project work hour prices that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<ProjectWorkHourPriceOutputModel>"
  },
  {
    "id": "ProjectWorkHourPrices_GetProjectWorkHourPrice",
    "method": "GET",
    "path": "/v1/projectworkhourprices/{guid}",
    "tag": "ProjectsRead",
    "summary": "Get project work hour price by ID",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the work hour price.",
        "type": "string"
      }
    ],
    "responseSchema": "ProjectWorkHourPriceOutputModel"
  },
  {
    "id": "ProjectWorkHourPrices_PatchProjectWorkHourPrice",
    "method": "PATCH",
    "path": "/v1/projectworkhourprices/{guid}",
    "tag": "ProjectsWrite",
    "summary": "Update (Patch) a work hour price or a part of it",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the work hour price",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProjectWorkHourPriceOutputModel>"
  },
  {
    "id": "ProjectWorkHourPrices_DeleteProjectWorkHourPrice",
    "method": "DELETE",
    "path": "/v1/projectworkhourprices/{guid}",
    "tag": "ProjectsDelete",
    "summary": "Deletes a work hour price",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "projects:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the work hour price.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ProjectWorkHourPrices_PostProjectWorkHourPrice",
    "method": "POST",
    "path": "/v1/projectworkhourprices",
    "tag": "ProjectsWrite",
    "summary": "Insert a work hour price",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProjectWorkHourPriceInputModel",
    "responseSchema": "ProjectWorkHourPriceOutputModel"
  },
  {
    "id": "ProposalSubtotals_GetProposalSubtotals",
    "method": "GET",
    "path": "/v1/proposalsubtotals",
    "tag": "ProjectsRead",
    "summary": "Get the proposal subtotals.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: Page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get proposal subtotals that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<ProposalSubtotalOutputModel>"
  },
  {
    "id": "ProposalSubtotals_PostProposalSubtotal",
    "method": "POST",
    "path": "/v1/proposalsubtotals",
    "tag": "ProjectsWrite",
    "summary": "Insert a proposal subtotal",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProposalSubtotalInputModel",
    "responseSchema": "ProposalSubtotalOutputModel"
  },
  {
    "id": "ProposalSubtotals_GetProposalSubtotalsForProposal",
    "method": "GET",
    "path": "/v1/proposals/{proposalGuid}/proposalsubtotals",
    "tag": "ProjectsRead",
    "summary": "Get all the proposal subtotals for a proposal",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "proposalGuid",
        "in": "path",
        "required": true,
        "description": "proposal id for which to get proposal subtotals.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: Page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default all.",
        "type": "integer:int32"
      }
    ],
    "responseSchema": "array<ProposalSubtotalOutputModel>"
  },
  {
    "id": "ProposalSubtotals_GetProposalSubtotal",
    "method": "GET",
    "path": "/v1/proposalsubtotals/{guid}",
    "tag": "ProjectsRead",
    "summary": "Get Proposal subtotal by ID",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the Proposal subtotal.",
        "type": "string"
      }
    ],
    "responseSchema": "ProposalSubtotalOutputModel"
  },
  {
    "id": "ProposalSubtotals_PatchProposalSubtotal",
    "method": "PATCH",
    "path": "/v1/proposalsubtotals/{guid}",
    "tag": "ProjectsWrite",
    "summary": "Update (Patch) a Proposal subtotal or a part of it",
    "description": "It is not possible to changed the proposalGuid for an existing proposal subtotal. Also, when a proposal subtotal is connected to a phase, the connection can only be broken if the phase is deleted.",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the Proposal subtotal",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProposalSubtotalOutputModel>"
  },
  {
    "id": "ProposalSubtotals_DeleteProposalSubtotal",
    "method": "DELETE",
    "path": "/v1/proposalsubtotals/{guid}",
    "tag": "ProjectsDelete",
    "summary": "Delete a proposal subtotal",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if proposal subtotal can't be found.",
    "scopes": [
      "projects:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the proposal subtotal to delete.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ProposalFees_GetProposalFees",
    "method": "GET",
    "path": "/v1/proposalfeerows",
    "tag": "ProjectsRead",
    "summary": "Get the proposal fee rows.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get proposal fee rows that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<ProposalFeeRowOutputModel>"
  },
  {
    "id": "ProposalFees_PostProposalFee",
    "method": "POST",
    "path": "/v1/proposalfeerows",
    "tag": "ProjectsWrite",
    "summary": "Insert a proposal fee row.",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProposalFeeRowInputModel",
    "responseSchema": "ProposalFeeRowOutputModel"
  },
  {
    "id": "ProposalFees_GetProposalFeesForProposal",
    "method": "GET",
    "path": "/v1/proposals/{proposalGuid}/proposalfeerows",
    "tag": "ProjectsRead",
    "summary": "Get all the proposal fee rows for a proposal",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "proposalGuid",
        "in": "path",
        "required": true,
        "description": "proposal id for which to get proposal fees rows.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default all.",
        "type": "integer:int32"
      }
    ],
    "responseSchema": "array<ProposalFeeRowOutputModel>"
  },
  {
    "id": "ProposalFees_GetProposalFee",
    "method": "GET",
    "path": "/v1/proposalfeerows/{guid}",
    "tag": "ProjectsRead",
    "summary": "Get the proposal fee rows by guid",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "proposal fee row id to get",
        "type": "string"
      }
    ],
    "responseSchema": "ProposalFeeRowOutputModel"
  },
  {
    "id": "ProposalFees_PatchProposalFee",
    "method": "PATCH",
    "path": "/v1/proposalfeerows/{guid}",
    "tag": "ProjectsWrite",
    "summary": "Update (Patch) a proposal fee row or a part of it",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the proposal fee row",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProposalFeeRowOutputModel>"
  },
  {
    "id": "ProposalFees_DeleteProposalFee",
    "method": "DELETE",
    "path": "/v1/proposalfeerows/{guid}",
    "tag": "ProjectsDelete",
    "summary": "Delete a proposal fee row",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if proposal fee row can't be found.",
    "scopes": [
      "projects:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the proposal fee row to delete",
        "type": "string"
      }
    ]
  },
  {
    "id": "ProposalStatuses_GetProposalStatuses",
    "method": "GET",
    "path": "/v1/proposalstatuses",
    "tag": "SettingsRead",
    "summary": "Get all the proposal statuses",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "isActive",
        "in": "query",
        "required": false,
        "description": "Optional: If not given, return all proposal statuses, if given as true return only active proposal statuses, if given as false returns only inactive proposal statuses.",
        "type": "boolean"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "proposalStatusName",
        "in": "query",
        "required": false,
        "description": "Optional: Search by proposal status name.",
        "type": "string"
      }
    ],
    "responseSchema": "array<ProposalStatusOutputModel>"
  },
  {
    "id": "ProposalStatuses_PostProposalStatus",
    "method": "POST",
    "path": "/v1/proposalstatuses",
    "tag": "SettingsWrite",
    "summary": "Insert a proposal status",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProposalStatusInputModel",
    "responseSchema": "ProposalStatusOutputModel"
  },
  {
    "id": "ProposalStatuses_GetProposalStatus",
    "method": "GET",
    "path": "/v1/proposalstatuses/{guid}",
    "tag": "SettingsRead",
    "summary": "Get Proposal status by ID",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the Proposal status.",
        "type": "string"
      }
    ],
    "responseSchema": "ProposalStatusOutputModel"
  },
  {
    "id": "ProposalStatuses_PatchProposalStatus",
    "method": "PATCH",
    "path": "/v1/proposalstatuses/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) an Proposal status or a part of it",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the Proposal status",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProposalStatusOutputModel>"
  },
  {
    "id": "ProposalStatuses_DeleteProposalStatus",
    "method": "DELETE",
    "path": "/v1/proposalstatuses/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete an proposal status",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if proposal status can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the proposal status to delete",
        "type": "string"
      },
      {
        "name": "moveUsagesToGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the proposal status to which to move usages of this proposal status. Default null. If proposal status is in use and usages aren't moved the deletion might fail.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ProposalStatuses_GetUsage",
    "method": "GET",
    "path": "/v1/proposalstatuses/{guid}/usage",
    "tag": "SettingsRead",
    "summary": "Get usage for an proposal status.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the proposal status.",
        "type": "string"
      }
    ],
    "responseSchema": "array<UsageModel2>"
  },
  {
    "id": "Proposals_GetProposals",
    "method": "GET",
    "path": "/v1/proposals",
    "tag": "ProjectsRead",
    "summary": "Get all the proposals",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get proposals that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<ProposalOutputModel>"
  },
  {
    "id": "Proposals_PostProposal",
    "method": "POST",
    "path": "/v1/proposals",
    "tag": "ProjectsWrite",
    "summary": "Insert a proposal.",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProposalInputModel",
    "responseSchema": "ProposalOutputModel"
  },
  {
    "id": "Proposals_GetProposalsForProject",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/proposals",
    "tag": "ProjectsRead",
    "summary": "Get all the proposals for a project",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "Project id for which to get proposals.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default all.",
        "type": "integer:int32"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get proposals that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<ProposalOutputModel>"
  },
  {
    "id": "Proposals_GetProposal",
    "method": "GET",
    "path": "/v1/proposals/{guid}",
    "tag": "ProjectsRead",
    "summary": "Get Proposal by ID",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the Proposal.",
        "type": "string"
      }
    ],
    "responseSchema": "ProposalOutputModel"
  },
  {
    "id": "Proposals_PatchProposal",
    "method": "PATCH",
    "path": "/v1/proposals/{guid}",
    "tag": "ProjectsWrite",
    "summary": "Update (Patch) a Proposal or a part of it",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Guid of the Proposal",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProposalOutputModel>"
  },
  {
    "id": "Proposals_DeleteProposal",
    "method": "DELETE",
    "path": "/v1/proposals/{guid}",
    "tag": "ProjectsDelete",
    "summary": "Delete a proposal",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if proposal can't be found.",
    "scopes": [
      "projects:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Guid for the proposal to delete",
        "type": "string"
      }
    ]
  },
  {
    "id": "ProposalSettings_GetProposalSettings",
    "method": "GET",
    "path": "/v1/proposals/{guid}/proposalsettings",
    "tag": "ProjectsRead",
    "summary": "Get settings for a proposal",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the Proposal.",
        "type": "string"
      }
    ],
    "responseSchema": "ProposalSettingsOutputModel"
  },
  {
    "id": "ProposalSettings_PatchProposalSettings",
    "method": "PATCH",
    "path": "/v1/proposals/{guid}/proposalsettings",
    "tag": "ProjectsWrite",
    "summary": "Update (Patch) proposal settings",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Guid of the Proposal",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProposalSettingsOutputModel>"
  },
  {
    "id": "ProposalWorkhours_GetProposalWorkHours",
    "method": "GET",
    "path": "/v1/proposalworkrows",
    "tag": "ProjectsRead",
    "summary": "Get the proposal work rows.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get proposal work rows that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<ProposalWorkhourRowOutputModel>"
  },
  {
    "id": "ProposalWorkhours_PostProposalWorkhour",
    "method": "POST",
    "path": "/v1/proposalworkrows",
    "tag": "ProjectsWrite",
    "summary": "Insert a proposal work row.",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProposalWorkhourRowInputModel",
    "responseSchema": "ProposalWorkhourRowOutputModel"
  },
  {
    "id": "ProposalWorkhours_GetProposalWorkHoursForProposal",
    "method": "GET",
    "path": "/v1/proposals/{proposalGuid}/proposalworkrows",
    "tag": "ProjectsRead",
    "summary": "Get all the proposal work rows.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "proposalGuid",
        "in": "path",
        "required": true,
        "description": "proposal id for which to get proposal work rows.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default all.",
        "type": "integer:int32"
      }
    ],
    "responseSchema": "array<ProposalWorkhourRowOutputModel>"
  },
  {
    "id": "ProposalWorkhours_GetProposalWorkhour",
    "method": "GET",
    "path": "/v1/proposalworkrows/{guid}",
    "tag": "ProjectsRead",
    "summary": "Get the proposal work row by guid.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "proposal work row id to get.",
        "type": "string"
      }
    ],
    "responseSchema": "ProposalWorkhourRowOutputModel"
  },
  {
    "id": "ProposalWorkhours_PatchProposalWorkhour",
    "method": "PATCH",
    "path": "/v1/proposalworkrows/{guid}",
    "tag": "ProjectsWrite",
    "summary": "Update (Patch) a proposal work row or a part of it.",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the proposal work row.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProposalWorkhourRowOutputModel>"
  },
  {
    "id": "ProposalWorkhours_DeleteProposalWorkhour",
    "method": "DELETE",
    "path": "/v1/proposalworkrows/{guid}",
    "tag": "ProjectsDelete",
    "summary": "Delete a proposal work row.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if proposal work row can't be found.",
    "scopes": [
      "projects:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the proposal work row to delete.",
        "type": "string"
      }
    ]
  },
  {
    "id": "RoleAllocations_GetRoleAllocations",
    "method": "GET",
    "path": "/v1/roleallocations",
    "tag": "ResourceallocationsRead",
    "summary": "Get role allocations.",
    "scopes": [
      "resourceallocations:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "startDate",
        "in": "query",
        "required": true,
        "description": "Starting date from which to get the role allocations. If end date is not specified on the role allocation then it will be compared with phase end date.",
        "type": "string:date-time"
      },
      {
        "name": "endDate",
        "in": "query",
        "required": false,
        "description": "Optional: Ending date to which to get the role allocations. If start date is not specified on the role allocation then it will be compared with phase start date.",
        "type": "string:date-time"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: Page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default all.",
        "type": "integer:int32"
      },
      {
        "name": "useSalesProbability",
        "in": "query",
        "required": false,
        "description": "Optional: Calculates the hours based on sales probability set for the project. Default is true.",
        "type": "boolean"
      },
      {
        "name": "roleGuids",
        "in": "query",
        "required": false,
        "description": "Optional: Role IDs.",
        "type": "array",
        "explode": true
      },
      {
        "name": "phaseGuids",
        "in": "query",
        "required": false,
        "description": "Optional: Phase IDs.",
        "type": "array",
        "explode": true
      },
      {
        "name": "projectGuids",
        "in": "query",
        "required": false,
        "description": "Optional: Project IDs.",
        "type": "array",
        "explode": true
      }
    ],
    "responseSchema": "array<RoleAllocationOutputModel>"
  },
  {
    "id": "RoleAllocations_PostRoleAllocation",
    "method": "POST",
    "path": "/v1/roleallocations",
    "tag": "ResourceallocationsWrite",
    "summary": "Insert a role allocation.",
    "scopes": [
      "resourceallocations:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "RoleAllocationInputModel",
    "responseSchema": "RoleAllocationOutputModel"
  },
  {
    "id": "RoleAllocations_GetRoleAllocation",
    "method": "GET",
    "path": "/v1/roleallocations/{guid}",
    "tag": "ResourceallocationsRead",
    "summary": "Get role allocation by GUID.",
    "scopes": [
      "resourceallocations:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID used to get the role allocation.",
        "type": "string"
      }
    ],
    "responseSchema": "RoleAllocationOutputModel"
  },
  {
    "id": "RoleAllocations_PatchRoleAllocation",
    "method": "PATCH",
    "path": "/v1/roleallocations/{guid}",
    "tag": "ResourceallocationsWrite",
    "summary": "Update (Patch) a role allocation.",
    "scopes": [
      "resourceallocations:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the role allocation.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<RoleAllocationOutputModel>"
  },
  {
    "id": "RoleAllocations_DeleteRoleAllocation",
    "method": "DELETE",
    "path": "/v1/roleallocations/{guid}",
    "tag": "ResourceallocationsDelete",
    "summary": "Delete a role allocation.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if role can't be found.",
    "scopes": [
      "resourceallocations:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the role allocation to delete.",
        "type": "string"
      }
    ]
  },
  {
    "id": "Roles_GetRoles",
    "method": "GET",
    "path": "/v1/roles",
    "tag": "SettingsRead",
    "summary": "Get roles.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "isActive",
        "in": "query",
        "required": false,
        "description": "If not given, return all roles, if given as true return only active roles, if given as false returns only inactive roles.",
        "type": "boolean"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: Page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default all.",
        "type": "integer:int32"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get roles that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<RoleOutputModel>"
  },
  {
    "id": "Roles_PostRole",
    "method": "POST",
    "path": "/v1/roles",
    "tag": "SettingsWrite",
    "summary": "Insert a role.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "RoleInputModel",
    "responseSchema": "RoleOutputModel"
  },
  {
    "id": "Roles_GetRole",
    "method": "GET",
    "path": "/v1/roles/{guid}",
    "tag": "SettingsRead",
    "summary": "Get role by GUID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the role.",
        "type": "string"
      }
    ],
    "responseSchema": "RoleOutputModel"
  },
  {
    "id": "Roles_PatchRole",
    "method": "PATCH",
    "path": "/v1/roles/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a role or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the role.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<RoleOutputModel>"
  },
  {
    "id": "Roles_DeleteRole",
    "method": "DELETE",
    "path": "/v1/roles/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete a role.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if role can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the role to delete.",
        "type": "string"
      }
    ]
  },
  {
    "id": "SalesNotes_GetProjectSalesNotes",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/projectsalesnotes",
    "tag": "ProjectsRead",
    "summary": "Get the sales notes of a case.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "Project guid used to get the notes.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get sales notes that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<ProjectSalesNoteOutputModel>"
  },
  {
    "id": "SalesNotes_GetCustomerSalesNotes",
    "method": "GET",
    "path": "/v1/customers/{customerGuid}/customersalesnotes",
    "tag": "CustomersRead",
    "summary": "Get the customer sales notes.",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "customerGuid",
        "in": "path",
        "required": true,
        "description": "Customer guid used to get the notes.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get sales notes that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<CustomerSalesNoteOutputModel>"
  },
  {
    "id": "SalesNotes_GetAllCustomerSalesNotes",
    "method": "GET",
    "path": "/v1/customers/{customerGuid}/salesnotes",
    "tag": "ProjectsRead",
    "summary": "Get the sales notes by customer guid.",
    "scopes": [
      "projects:read",
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "customerGuid",
        "in": "path",
        "required": true,
        "description": "Customer guid used to get the notes.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get sales notes that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<SalesNoteOutputModel>"
  },
  {
    "id": "SalesNotes_GetProjectSalesNote",
    "method": "GET",
    "path": "/v1/projectsalesnotes/{guid}",
    "tag": "ProjectsRead",
    "summary": "Get project sales note by ID.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the project sales note.",
        "type": "string"
      }
    ],
    "responseSchema": "ProjectSalesNoteOutputModel"
  },
  {
    "id": "SalesNotes_PatchProjectSalesNote",
    "method": "PATCH",
    "path": "/v1/projectsalesnotes/{guid}",
    "tag": "ProjectsWrite",
    "summary": "Update (Patch) a project sales note or a part of it.",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the project sales note.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProjectSalesNoteOutputModel>"
  },
  {
    "id": "SalesNotes_DeleteProjectSalesNote",
    "method": "DELETE",
    "path": "/v1/projectsalesnotes/{guid}",
    "tag": "ProjectsDelete",
    "summary": "Deletes a project sales note.",
    "description": "Returns: No Content (204) if succeeded. OK (200) if note has child notes and can't be deleted. It is marked as IsDeleted = true. Not found (404) if note can't be found.",
    "scopes": [
      "projects:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the project sales note.",
        "type": "string"
      }
    ]
  },
  {
    "id": "SalesNotes_GetCustomerSalesNote",
    "method": "GET",
    "path": "/v1/customersalesnotes/{guid}",
    "tag": "CustomersRead",
    "summary": "Get customer sales note by ID.",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the customer sales note.",
        "type": "string"
      }
    ],
    "responseSchema": "CustomerSalesNoteOutputModel"
  },
  {
    "id": "SalesNotes_PatchCustomerSalesNote",
    "method": "PATCH",
    "path": "/v1/customersalesnotes/{guid}",
    "tag": "CustomersWrite",
    "summary": "Update (Patch) a customer sales note or a part of it.",
    "scopes": [
      "customers:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the customer sales note.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<CustomerSalesNoteOutputModel>"
  },
  {
    "id": "SalesNotes_DeleteCustomerSalesNote",
    "method": "DELETE",
    "path": "/v1/customersalesnotes/{guid}",
    "tag": "CustomersDelete",
    "summary": "Deletes a customer sales note.",
    "description": "Returns: No Content (204) if succeeded. OK (200) if note has child notes and can't be deleted. It is marked as IsDeleted = true. Not found (404) if note can't be found.",
    "scopes": [
      "customers:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the customer sales note.",
        "type": "string"
      }
    ]
  },
  {
    "id": "SalesNotes_PostProjectSalesNotes",
    "method": "POST",
    "path": "/v1/projectsalesnotes",
    "tag": "ProjectsWrite",
    "summary": "Insert a project sales note.",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProjectSalesNoteInputModel",
    "responseSchema": "ProjectSalesNoteOutputModel"
  },
  {
    "id": "SalesNotes_PostCustomerSalesNotes",
    "method": "POST",
    "path": "/v1/customersalesnotes",
    "tag": "CustomersWrite",
    "summary": "Insert a customer sales note.",
    "scopes": [
      "customers:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "CustomerSalesNoteInputModel",
    "responseSchema": "CustomerSalesNoteOutputModel"
  },
  {
    "id": "UserCustomProperties_GetUserCustomProperties",
    "method": "GET",
    "path": "/v1/users/customproperties",
    "tag": "SettingsRead",
    "summary": "Get the user custom properties.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "isActive",
        "in": "query",
        "required": false,
        "description": "Optional: Get only active or inactive user custom properties.",
        "type": "boolean"
      },
      {
        "name": "isInUse",
        "in": "query",
        "required": false,
        "description": "Optional: Is the customer property used in any custom property usage.",
        "type": "boolean"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get custom properties that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<UserCustomPropertyOutputModel>"
  },
  {
    "id": "UserCustomProperties_PostUserCustomProperty",
    "method": "POST",
    "path": "/v1/users/customproperties",
    "tag": "SettingsWrite",
    "summary": "Insert a user custom property.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "UserCustomPropertyInputModel",
    "responseSchema": "UserCustomPropertyOutputModel"
  },
  {
    "id": "UserCustomProperties_GetUserCustomProperty",
    "method": "GET",
    "path": "/v1/users/customproperties/{guid}",
    "tag": "SettingsRead",
    "summary": "Get user custom property by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the user custom property.",
        "type": "string"
      }
    ],
    "responseSchema": "UserCustomPropertyOutputModel"
  },
  {
    "id": "UserCustomProperties_PatchUserCustomProperty",
    "method": "PATCH",
    "path": "/v1/users/customproperties/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a user custom property or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the user custom property Can also be comma separate list of IDs to patch multiple user custom properties with one call. When multiple IDs are given, returns model which has list of succeeded user custom properties and list of errors.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<UserCustomPropertyOutputModel>"
  },
  {
    "id": "UserCustomProperties_DeleteUserCustomProperty",
    "method": "DELETE",
    "path": "/v1/users/customproperties/{guid}",
    "tag": "SettingsDelete",
    "summary": "Deletes a user custom property.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the user custom property.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ProjectCustomValues_GetProjectsCustomValues",
    "method": "GET",
    "path": "/v1/projects/customvalues",
    "tag": "ProjectsRead",
    "summary": "Get the project custom values.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "isActive",
        "in": "query",
        "required": false,
        "description": "Optional: Get only values of active or inactive custom properties.",
        "type": "boolean"
      },
      {
        "name": "targets",
        "in": "query",
        "required": false,
        "description": "Optional: List of target for which to get the values.",
        "type": "array",
        "explode": true
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get custom values that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<ProjectCustomValueOutputModel>"
  },
  {
    "id": "ProjectCustomValues_PostProjectCustomValue",
    "method": "POST",
    "path": "/v1/projects/customvalues",
    "tag": "ProjectsWrite",
    "summary": "Insert a project custom value.",
    "description": "Value depends on the custom property type. For selection type, it should be an array of objects containing key field as the value identifier. For other types it should be a single value.",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProjectCustomValueModel",
    "responseSchema": "array<ProjectCustomValueModel>"
  },
  {
    "id": "UserCustomValues_GetUserCustomValues",
    "method": "GET",
    "path": "/v1/users/{userGuid}/customvalues",
    "tag": "UsersRead",
    "summary": "Get the user custom values.",
    "scopes": [
      "users:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "userGuid",
        "in": "path",
        "required": true,
        "description": "ID of the user.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "isActive",
        "in": "query",
        "required": false,
        "description": "Optional: Get only values of active or inactive user custom properties.",
        "type": "boolean"
      },
      {
        "name": "targets",
        "in": "query",
        "required": false,
        "description": "Optional: List of target for which to get the values.",
        "type": "array",
        "explode": true
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get user custom values that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<UserCustomValueOutputModel>"
  },
  {
    "id": "UserCustomValues_GetUsersCustomValues",
    "method": "GET",
    "path": "/v1/users/customvalues",
    "tag": "UsersRead",
    "summary": "Get the user custom values.",
    "scopes": [
      "users:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "isActive",
        "in": "query",
        "required": false,
        "description": "Optional: Get only values of active or inactive user custom properties.",
        "type": "boolean"
      },
      {
        "name": "targets",
        "in": "query",
        "required": false,
        "description": "Optional: List of target for which to get the values.",
        "type": "array",
        "explode": true
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get user custom values that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<UserCustomValueOutputModel>"
  },
  {
    "id": "UserCustomValues_PostUserCustomValue",
    "method": "POST",
    "path": "/v1/users/customvalues",
    "tag": "UsersWrite",
    "summary": "Insert a user custom value.",
    "description": "Value depends on the custom property type. For selection type, it should be an array of objects containing key field as the value identifier. For other types it should be a single value.",
    "scopes": [
      "users:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "UserCustomValueInputModel",
    "responseSchema": "array<UserCustomValueOutputModel>"
  },
  {
    "id": "UserCustomValues_GetUserCustomValue",
    "method": "GET",
    "path": "/v1/users/customvalues/{guid}",
    "tag": "UsersRead",
    "summary": "Get user custom value by ID.",
    "scopes": [
      "users:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the user custom value.",
        "type": "string"
      }
    ],
    "responseSchema": "UserCustomValueOutputModel"
  },
  {
    "id": "UserCustomValues_PatchUserCustomValue",
    "method": "PATCH",
    "path": "/v1/users/customvalues/{guid}",
    "tag": "UsersWrite",
    "summary": "Update (Patch) a user custom value or a part of it.",
    "scopes": [
      "users:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the user custom value Can also be comma separate list of IDs to patch multiple user custom values with one call. When multiple IDs are given, returns model which has list of succeeded user custom values and list of errors.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<UserCustomValueOutputModel>"
  },
  {
    "id": "UserCustomValues_DeleteUserCustomValue",
    "method": "DELETE",
    "path": "/v1/users/customvalues/{guid}",
    "tag": "UsersDelete",
    "summary": "Deletes a user custom value.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "users:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the user custom value.",
        "type": "string"
      }
    ]
  },
  {
    "id": "UserCustomPropertySelectionItems_GetUserCustomPropertySelectionItems",
    "method": "GET",
    "path": "/v1/users/customproperties/{customPropertyGuid}/usercustompropertyselectionitems",
    "tag": "SettingsRead",
    "summary": "Get the user custom properties.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "customPropertyGuid",
        "in": "path",
        "required": true,
        "description": "Custom property id used to get the user custom property selection items.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "isActive",
        "in": "query",
        "required": false,
        "description": "Optional: Get only active or inactive selection items.",
        "type": "boolean"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get custom property selection items that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<UserCustomPropertySelectionItemOutputModel>"
  },
  {
    "id": "UserCustomPropertySelectionItems_GetUserCustomPropertySelectionItem",
    "method": "GET",
    "path": "/v1/users/customproperties/usercustompropertyselectionitems/{guid}",
    "tag": "SettingsRead",
    "summary": "Get user custom property selection item by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the user custom property selection item.",
        "type": "string"
      }
    ],
    "responseSchema": "UserCustomPropertySelectionItemOutputModel"
  },
  {
    "id": "UserCustomPropertySelectionItems_PatchUserCustomPropertySelectionItem",
    "method": "PATCH",
    "path": "/v1/users/customproperties/usercustompropertyselectionitems/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a user custom property selection item or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the user custom property selection item.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<UserCustomPropertySelectionItemOutputModel>"
  },
  {
    "id": "UserCustomPropertySelectionItems_DeleteUserCustomPropertySelectionItem",
    "method": "DELETE",
    "path": "/v1/users/customproperties/usercustompropertyselectionitems/{guid}",
    "tag": "SettingsDelete",
    "summary": "Deletes a user custom property selection item.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the user custom property selection item.",
        "type": "string"
      }
    ]
  },
  {
    "id": "UserCustomPropertySelectionItems_PostUserCustomPropertySelectionItem",
    "method": "POST",
    "path": "/v1/users/customproperties/usercustompropertyselectionitems",
    "tag": "SettingsWrite",
    "summary": "Insert a user custom property selection item.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "UserCustomPropertySelectionItemInputModel",
    "responseSchema": "UserCustomPropertySelectionItemOutputModel"
  },
  {
    "id": "WorkContracts_GetWorkContract",
    "method": "GET",
    "path": "/v1/workcontracts/{guid}",
    "tag": "SettingsRead",
    "summary": "Get work contract by ID.",
    "scopes": [
      "settings:read",
      "users:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the work contract.",
        "type": "string"
      }
    ],
    "responseSchema": "WorkContractOutputModel"
  },
  {
    "id": "WorkContracts_PatchWorkContract",
    "method": "PATCH",
    "path": "/v1/workcontracts/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a work contract or a part of it.",
    "scopes": [
      "settings:write",
      "users:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the work contract.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<WorkContractOutputModel>"
  },
  {
    "id": "WorkContracts_DeleteWorkContract",
    "method": "DELETE",
    "path": "/v1/workcontracts/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete a work contract.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if work contract can't be found.",
    "scopes": [
      "settings:delete",
      "users:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the work contract to delete.",
        "type": "string"
      }
    ]
  },
  {
    "id": "WorkContracts_GetCurrentWorkContractForUser",
    "method": "GET",
    "path": "/v1/users/{userGuid}/workcontracts/current",
    "tag": "UsersRead",
    "summary": "Gets current work contract for the user",
    "scopes": [
      "users:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "userGuid",
        "in": "path",
        "required": true,
        "description": "Id of the user",
        "type": "string"
      }
    ],
    "responseSchema": "WorkContractOutputModel"
  },
  {
    "id": "WorkContracts_GetWorkContractsForUser",
    "method": "GET",
    "path": "/v1/users/{userGuid}/workcontracts",
    "tag": "UsersRead",
    "summary": "Get all the work contracts for the user.",
    "scopes": [
      "users:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "userGuid",
        "in": "path",
        "required": true,
        "description": "Id of the user.",
        "type": "string"
      }
    ],
    "responseSchema": "array<WorkContractOutputModel>"
  },
  {
    "id": "WorkContracts_PostWorkContract",
    "method": "POST",
    "path": "/v1/workcontracts",
    "tag": "SettingsWrite",
    "summary": "Insert a work contract.",
    "scopes": [
      "settings:write",
      "users:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "resetFlextime",
        "in": "query",
        "required": false,
        "description": "Optional. Reset flextime to zero when new work contract starts or keep the flextime value. Default true = reset flextime.",
        "type": "boolean"
      }
    ],
    "requestSchema": "WorkContractInputModel",
    "responseSchema": "WorkContractOutputModel"
  },
  {
    "id": "WorkHourPrices_GetWorkHourPrice",
    "method": "GET",
    "path": "/v1/workhourprices/{guid}",
    "tag": "SettingsRead",
    "summary": "Get work hour price by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the work hour price.",
        "type": "string"
      }
    ],
    "responseSchema": "WorkHourPriceOutputModel"
  },
  {
    "id": "WorkHourPrices_GetWorkHourPrices",
    "method": "GET",
    "path": "/v1/pricelistversions/{pricelistVersionGuid}/workhourprices",
    "tag": "SettingsRead",
    "summary": "Get all the workHourPrices for a price list version.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pricelistVersionGuid",
        "in": "path",
        "required": true,
        "description": "Price list version identifier.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page..",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get prices that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "WorkHourPriceOutputModel"
  },
  {
    "id": "CustomerCustomProperties_GetCustomerCustomProperties",
    "method": "GET",
    "path": "/v1/customers/customproperties",
    "tag": "SettingsRead",
    "summary": "Get the customer custom properties.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "Optional: Get only active or inactive customer properties.",
        "type": "boolean"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from custom property name.",
        "type": "string"
      },
      {
        "name": "isInUse",
        "in": "query",
        "required": false,
        "description": "Optional: Is the customer property used in any custom property usage.",
        "type": "boolean"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (sub-model fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=Name&sortings[0].value=Desc&sortings[1].key=Number&sortings[1].value=Asc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<CustomPropertyModel>"
  },
  {
    "id": "CustomerCustomProperties_PostCustomerCustomProperty",
    "method": "POST",
    "path": "/v1/customers/customproperties",
    "tag": "SettingsWrite",
    "summary": "Insert a customer custom property.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "CustomPropertyModel",
    "responseSchema": "array<CustomPropertyModel>"
  },
  {
    "id": "CustomerCustomProperties_GetCustomerCustomProperty",
    "method": "GET",
    "path": "/v1/customers/customproperties/{guid}",
    "tag": "SettingsRead",
    "summary": "Get customer custom property by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the customer custom property.",
        "type": "string"
      }
    ],
    "responseSchema": "CustomPropertyModel"
  },
  {
    "id": "CustomerCustomProperties_PatchCustomerCustomProperty",
    "method": "PATCH",
    "path": "/v1/customers/customproperties/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a customer custom property or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the customer custom property Can also be comma separate list of IDs to patch multiple customer custom properties with one call. When multiple IDs are given, returns model which has list of succeeded customer custom properties and list of errors.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<CustomPropertyModel>"
  },
  {
    "id": "CustomerCustomProperties_DeleteCustomerCustomProperty",
    "method": "DELETE",
    "path": "/v1/customers/customproperties/{guid}",
    "tag": "SettingsDelete",
    "summary": "Deletes a customer custom property.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the customer custom property.",
        "type": "string"
      }
    ]
  },
  {
    "id": "CustomerCustomValues_GetCustomerCustomValues",
    "method": "GET",
    "path": "/v1/customers/{customerGuid}/customvalues",
    "tag": "CustomersRead",
    "summary": "Get the customer custom values.",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "customerGuid",
        "in": "path",
        "required": true,
        "description": "ID of the customer.",
        "type": "string"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "Optional: Get only values of active or inactive customer custom properties.",
        "type": "boolean"
      },
      {
        "name": "target",
        "in": "query",
        "required": false,
        "description": "List of target for which to get the values.",
        "type": "array",
        "explode": true
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (sub-model fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=Name&sortings[0].value=Desc&sortings[1].key=Number&sortings[1].value=Asc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<CustomerCustomValueModel>"
  },
  {
    "id": "CustomerCustomValues_GetCustomerCustomValue",
    "method": "GET",
    "path": "/v1/customers/customvalues/{guid}",
    "tag": "CustomersRead",
    "summary": "Get customer custom value by ID.",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the customer custom value.",
        "type": "string"
      }
    ],
    "responseSchema": "CustomerCustomValueModel"
  },
  {
    "id": "CustomerCustomValues_PatchCustomerCustomValue",
    "method": "PATCH",
    "path": "/v1/customers/customvalues/{guid}",
    "tag": "CustomersWrite",
    "summary": "Update (Patch) a customer custom value or a part of it.",
    "scopes": [
      "customers:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the customer custom value Can also be comma separate list of IDs to patch multiple customer custom values with one call. When multiple IDs are given, returns model which has list of succeeded customer custom values and list of errors.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<CustomerCustomValueModel>"
  },
  {
    "id": "CustomerCustomValues_DeleteCustomerCustomValue",
    "method": "DELETE",
    "path": "/v1/customers/customvalues/{guid}",
    "tag": "CustomersDelete",
    "summary": "Deletes a customer custom value.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "customers:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the customer custom value.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ProjectCustomProperties_GetProjectCustomProperties",
    "method": "GET",
    "path": "/v1/projects/customproperties",
    "tag": "SettingsRead",
    "summary": "Get the project custom properties.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "Optional: Get only active or inactive project properties.",
        "type": "boolean"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from custom property name.",
        "type": "string"
      },
      {
        "name": "isInUse",
        "in": "query",
        "required": false,
        "description": "Optional: Is the customer property used in any custom property usage.",
        "type": "boolean"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (sub-model fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=Name&sortings[0].value=Desc&sortings[1].key=Number&sortings[1].value=Asc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<CustomPropertyModel>"
  },
  {
    "id": "ProjectCustomProperties_PostProjectCustomProperty",
    "method": "POST",
    "path": "/v1/projects/customproperties",
    "tag": "SettingsWrite",
    "summary": "Insert a project custom property.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "CustomPropertyModel",
    "responseSchema": "array<CustomPropertyModel>"
  },
  {
    "id": "ProjectCustomProperties_GetProjectCustomProperty",
    "method": "GET",
    "path": "/v1/projects/customproperties/{guid}",
    "tag": "SettingsRead",
    "summary": "Get project custom property by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the project custom property.",
        "type": "string"
      }
    ],
    "responseSchema": "CustomPropertyModel"
  },
  {
    "id": "ProjectCustomProperties_PatchProjectCustomProperty",
    "method": "PATCH",
    "path": "/v1/projects/customproperties/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a project custom property or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the project custom property Can also be comma separate list of IDs to patch multiple project custom properties with one call. When multiple IDs are given, returns model which has list of succeeded project custom properties and list of errors.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<CustomPropertyModel>"
  },
  {
    "id": "ProjectCustomProperties_DeleteProjectCustomProperty",
    "method": "DELETE",
    "path": "/v1/projects/customproperties/{guid}",
    "tag": "SettingsDelete",
    "summary": "Deletes a project custom property.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the project custom property.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ProjectCustomValues_GetProjectCustomValues",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/customvalues",
    "tag": "ProjectsRead",
    "summary": "Get the project custom values.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "ID of the project.",
        "type": "string"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "Optional: Get only values of active or inactive project custom properties.",
        "type": "boolean"
      },
      {
        "name": "target",
        "in": "query",
        "required": false,
        "description": "List of target for which to get the values.",
        "type": "array",
        "explode": true
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (sub-model fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=Name&sortings[0].value=Desc&sortings[1].key=Number&sortings[1].value=Asc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<ProjectCustomValueModel>"
  },
  {
    "id": "ProjectCustomValues_GetProjectCustomValue",
    "method": "GET",
    "path": "/v1/projects/customvalues/{guid}",
    "tag": "ProjectsRead",
    "summary": "Get project custom value by ID.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the project custom value.",
        "type": "string"
      }
    ],
    "responseSchema": "ProjectCustomValueModel"
  },
  {
    "id": "ProjectCustomValues_PatchProjectCustomValue",
    "method": "PATCH",
    "path": "/v1/projects/customvalues/{guid}",
    "tag": "ProjectsWrite",
    "summary": "Update (Patch) a project custom value or a part of it.",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the project custom value Can also be comma separate list of IDs to patch multiple project custom values with one call. When multiple IDs are given, returns model which has list of succeeded project custom values and list of errors.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProjectCustomValueModel>"
  },
  {
    "id": "ProjectCustomValues_DeleteProjectCustomValue",
    "method": "DELETE",
    "path": "/v1/projects/customvalues/{guid}",
    "tag": "ProjectsDelete",
    "summary": "Deletes a project custom value.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "projects:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the project custom value.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ActivityTypes_GetActivityTypes",
    "method": "GET",
    "path": "/v1/activitytypes",
    "tag": "SettingsRead",
    "summary": "Get the Activity Types",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all Activity Types, if given as true return only active Activity Types, if given as false returns only inactive Activity Types",
        "type": "boolean"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get activity types that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "category",
        "in": "query",
        "required": false,
        "description": "Optional: Category or multiple categories of activity types to search for. Default all.",
        "type": "array<ActivityCategory>",
        "explode": true
      }
    ],
    "responseSchema": "array<ActivityTypeModel>"
  },
  {
    "id": "ActivityTypes_PostActivityType",
    "method": "POST",
    "path": "/v1/activitytypes",
    "tag": "SettingsWrite",
    "summary": "Insert an Activity type.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ActivityTypeModel",
    "responseSchema": "ActivityTypeModel"
  },
  {
    "id": "ActivityTypes_GetActivityType",
    "method": "GET",
    "path": "/v1/activitytypes/{guid}",
    "tag": "SettingsRead",
    "summary": "Get Activity Type by ID",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the Activity Type.",
        "type": "string"
      }
    ],
    "responseSchema": "ActivityTypeModel"
  },
  {
    "id": "ActivityTypes_PatchActivityType",
    "method": "PATCH",
    "path": "/v1/activitytypes/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) an Activity Type or a part of it",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the Activity Type",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ActivityTypeModel>"
  },
  {
    "id": "ActivityTypes_DeleteActivityType",
    "method": "DELETE",
    "path": "/v1/activitytypes/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete an activity type.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if activity type can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the activity type to delete",
        "type": "string"
      },
      {
        "name": "moveUsagesToGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the activity type to which to move usages of this activity type. Default null. If activity type is in use and usages aren't moved the deletion might fail.",
        "type": "string"
      }
    ]
  },
  {
    "id": "EInvoiceAddresses_GetEInvoiceAddresses",
    "method": "GET",
    "path": "/v1/customers/{guid}/einvoiceaddresses",
    "tag": "CustomersRead",
    "summary": "Get customers eInvoicing information.",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Guid of the customer.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: Page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch.",
        "type": "integer:int32"
      }
    ],
    "responseSchema": "array<EInvoicingAddressOutputModel>"
  },
  {
    "id": "EInvoiceAddresses_GetEInvoiceAddress",
    "method": "GET",
    "path": "/v1/einvoiceaddresses/{guid}",
    "tag": "CustomersRead",
    "summary": "Get eInvoicing information by ID.",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the eInvoicing information.",
        "type": "string"
      }
    ],
    "responseSchema": "EInvoicingAddressOutputModel"
  },
  {
    "id": "Invoices_GetInvoices",
    "method": "GET",
    "path": "/v1/invoices",
    "tag": "InvoicesRead",
    "summary": "Get Invoices",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Number of rows to fetch.",
        "type": "integer:int32"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "paymentDateStart",
        "in": "query",
        "required": false,
        "description": "Optional: Get only invoices paid at this date or later. Default: Get invoices regardless of payment date.",
        "type": "string:date-time"
      },
      {
        "name": "invoiceStatusGuids",
        "in": "query",
        "required": false,
        "description": "Optional: Get invoices with this status only. Default: all statuses.",
        "type": "array",
        "explode": true
      },
      {
        "name": "projectGuids",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the project to get the invoices. If not provided, returns for all projects. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "projectOwnerGuids",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the project manager to get the invoices for. If not provided, returns for all project managers. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "projectBusinessUnitGuids",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the business unit of the project. If not provided, returns for all business units. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "customerGuids",
        "in": "query",
        "required": false,
        "description": "Optional: List of customer IDs. Get invoices for these customers.",
        "type": "array",
        "explode": true
      },
      {
        "name": "startDate",
        "in": "query",
        "required": false,
        "description": "Optional: starting date from which to get the invoices. Default all.",
        "type": "string:date-time"
      },
      {
        "name": "endDate",
        "in": "query",
        "required": false,
        "description": "Optional: end date from which to get the invoices. Default all.",
        "type": "string:date-time"
      },
      {
        "name": "minimumTotalExcludingTax",
        "in": "query",
        "required": false,
        "description": "Optional: specifies minimum value for invoice total in organization currency.",
        "type": "number:double"
      },
      {
        "name": "maximumTotalExcludingTax",
        "in": "query",
        "required": false,
        "description": "Optional: specifies maximum value for invoice total in organization currency.",
        "type": "number:double"
      },
      {
        "name": "referenceNumbers",
        "in": "query",
        "required": false,
        "description": "Optional: Invoice reference number. If not provided, returns invoices with any invoice reference number.",
        "type": "array",
        "explode": true
      },
      {
        "name": "numbers",
        "in": "query",
        "required": false,
        "description": "Optional: Invoice number. If not provided, returns invoices with any invoice number.",
        "type": "array",
        "explode": true
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get invoices that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "salesPersonGuids",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the salesperson to get the invoices for. If not provided, returns for all sales persons.",
        "type": "array",
        "explode": true
      },
      {
        "name": "createdByUserGuids",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the user who created the invoice. If not provided, returns for all users.",
        "type": "array",
        "explode": true
      }
    ],
    "responseSchema": "array<InvoiceOutputModel>"
  },
  {
    "id": "Invoices_PostInvoiceCreation",
    "method": "POST",
    "path": "/v1/invoices",
    "tag": "InvoicesWrite",
    "summary": "Add an invoice to project(s)",
    "scopes": [
      "invoices:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "CreateInvoiceModel",
    "responseSchema": "array<InvoiceOutputModel>"
  },
  {
    "id": "Customers_GetCustomers",
    "method": "GET",
    "path": "/v1/customers",
    "tag": "CustomersRead",
    "summary": "Get all the customers",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch.",
        "type": "integer:int32"
      },
      {
        "name": "isActive",
        "in": "query",
        "required": false,
        "description": "If not given, return all Customers, if given as true return only active Customers, if given as false returns only inactive Customers.",
        "type": "boolean"
      },
      {
        "name": "customerOwnerGuids",
        "in": "query",
        "required": false,
        "description": "Optional: List of customer owner ids to search for. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "isInternal",
        "in": "query",
        "required": false,
        "description": "Optional: When true returns only internal customer.",
        "type": "boolean"
      },
      {
        "name": "numbers",
        "in": "query",
        "required": false,
        "description": "Optional: List of customer numbers.",
        "type": "array",
        "explode": true
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get customers that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "emailAddresses",
        "in": "query",
        "required": false,
        "description": "Optional: Get customers where email address matches to any provided email address.",
        "type": "array",
        "explode": true
      },
      {
        "name": "customerNames",
        "in": "query",
        "required": false,
        "description": "Optional: Get customers where customer name matches to any provided customer name.",
        "type": "array",
        "explode": true
      },
      {
        "name": "vatNumber",
        "in": "query",
        "required": false,
        "description": "Optional: Get customers based on VAT number with exact match.",
        "type": "string"
      },
      {
        "name": "kvkNumber",
        "in": "query",
        "required": false,
        "description": "Optional: Get customers based on KVK number with exact match.",
        "type": "string"
      },
      {
        "name": "changedSinceOptions",
        "in": "query",
        "required": false,
        "description": "Optional: Extend changedSince parameter by searching from linked resources.",
        "type": "array<CustomerChangedSinceSearchExtensionOptions>",
        "explode": true
      }
    ],
    "responseSchema": "array<CustomerModel>"
  },
  {
    "id": "Customers_PostCustomer",
    "method": "POST",
    "path": "/v1/customers",
    "tag": "CustomersWrite",
    "summary": "Insert a customer.",
    "scopes": [
      "customers:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "CustomerModel",
    "responseSchema": "CustomerModel"
  },
  {
    "id": "CustomerFiles_GetCustomerFiles",
    "method": "GET",
    "path": "/v1/customers/{customerGuid}/files",
    "tag": "FilesRead",
    "summary": "Get all files of customer.",
    "scopes": [
      "files:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "customerGuid",
        "in": "path",
        "required": true,
        "description": "GUID of the customer used to get the files.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: Page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch.",
        "type": "integer:int32"
      }
    ],
    "responseSchema": "array<CustomerFileModel>"
  },
  {
    "id": "CustomerFiles_PostCustomerFile",
    "method": "POST",
    "path": "/v1/customers/{customerGuid}/files",
    "tag": "FilesWrite",
    "summary": "Insert a customer file.",
    "description": "Supports multiple files and meta data. Expects MIME multipart content, with optional FileModel JSON content before binary file data. POST /customers/{customerGuid}/files HTTP/1.1 Authorization: Bearer your_auth_token Content-Type: multipart/related; boundary=randomboundarystring Content-Length: number_of_bytes_in_entire_request_body --randomboundarystring Content-Type: application/json {\"Description\" : \"SomeFileDescription\", \"Name\" : \"somefile.ext\"} --randomboundarystring Content-Type: image/jpeg Binary data --randomboundarystring--.",
    "scopes": [
      "files:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "customerGuid",
        "in": "path",
        "required": true,
        "description": "GUID of the customer or to insert file to.",
        "type": "string"
      }
    ],
    "responseSchema": "array<CustomerFileModel>"
  },
  {
    "id": "CustomerFiles_GetCustomerFile",
    "method": "GET",
    "path": "/v1/customerfiles/{guid}",
    "tag": "FilesRead",
    "summary": "Get customer file by ID.",
    "scopes": [
      "files:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the customer file.",
        "type": "string"
      }
    ],
    "responseSchema": "CustomerFileModel"
  },
  {
    "id": "CustomerFiles_DeleteCustomerFile",
    "method": "DELETE",
    "path": "/v1/customerfiles/{guid}",
    "tag": "FilesDelete",
    "summary": "Deletes a customer file.",
    "description": "Deletes both file data and meta data. Returns: No Content (204) if succeeded.",
    "scopes": [
      "files:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the customer file.",
        "type": "string"
      }
    ]
  },
  {
    "id": "InvoiceSettings_GetInvoiceSettings",
    "method": "GET",
    "path": "/v1/invoices/{invoiceGuid}/invoicesettings",
    "tag": "InvoicesRead",
    "summary": "Get invoice settings by invoice GUID",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "invoiceGuid",
        "in": "path",
        "required": true,
        "description": "Invoice GUID used to get the invoice settings.",
        "type": "string"
      }
    ],
    "responseSchema": "InvoiceSettingsOutputModel"
  },
  {
    "id": "InvoiceSettings_PatchInvoiceSettings",
    "method": "PATCH",
    "path": "/v1/invoicesettings/{guid}",
    "tag": "InvoicesWrite",
    "summary": "Update (Patch) invoice setting",
    "scopes": [
      "invoices:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the invoice settings",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "InvoiceSettingsOutputModel"
  },
  {
    "id": "InvoiceRows_GetInvoiceRows",
    "method": "GET",
    "path": "/v1/invoicerows",
    "tag": "InvoicesRead",
    "summary": "Get invoice rows",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get invoice rows that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<InvoiceRowOutputModel>"
  },
  {
    "id": "InvoiceRows_GetInvoiceRowsForInvoice",
    "method": "GET",
    "path": "/v1/invoices/{invoiceGuid}/invoicerows",
    "tag": "InvoicesRead",
    "summary": "Get Invoice rows for an invoice.",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "invoiceGuid",
        "in": "path",
        "required": true,
        "description": "ID of the invoice.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "rowType",
        "in": "query",
        "required": false,
        "description": "Optional: Type of the row. Either Hours or ProjectFees, Default all.",
        "type": "InvoiceRowType"
      }
    ],
    "responseSchema": "array<InvoiceRowOutputModel>"
  },
  {
    "id": "InvoiceRows_GetInvoiceRow",
    "method": "GET",
    "path": "/v1/invoicerows/{guid}",
    "tag": "InvoicesRead",
    "summary": "Get invoice row by ID",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID of the invoice row.",
        "type": "string"
      }
    ],
    "responseSchema": "InvoiceRowOutputModel"
  },
  {
    "id": "InvoiceRows_PatchInvoiceRow",
    "method": "PATCH",
    "path": "/v1/invoicerows/{guid}",
    "tag": "InvoicesWrite",
    "summary": "Update (Patch) a invoice row or a part of it",
    "description": "If CostCenterNumber, SalesAccountNumber or RecurringSalesAccountNumber are changed and the invoice row is related to one or many ProjectFees or ProjectTravelExpenses, the values for those will also be updated.",
    "scopes": [
      "invoices:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the invoice row",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<InvoiceRowOutputModel>"
  },
  {
    "id": "InvoiceRows_DeleteInvoiceRow",
    "method": "DELETE",
    "path": "/v1/invoicerows/{guid}",
    "tag": "InvoicesDelete",
    "summary": "Deletes an invoice row",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "invoices:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the invoice row.",
        "type": "string"
      },
      {
        "name": "setAsNonBillable",
        "in": "query",
        "required": false,
        "type": "boolean"
      }
    ]
  },
  {
    "id": "Languages_GetLanguages",
    "method": "GET",
    "path": "/v1/localization/languages",
    "tag": "SettingsRead",
    "summary": "Get all the languages",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "isInvoiceLanguage",
        "in": "query",
        "required": false,
        "description": "Optional: which languages to fetch. only invoice languages or non invoice languages?, default all.",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<LanguageModel>"
  },
  {
    "id": "Languages_GetLanguage",
    "method": "GET",
    "path": "/v1/localization/languages/{guid}",
    "tag": "SettingsRead",
    "summary": "Get language by ID",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the language.",
        "type": "string"
      }
    ],
    "responseSchema": "LanguageModel"
  },
  {
    "id": "OrganizationDetails_GetOrganizationDetails",
    "method": "GET",
    "path": "/v1/organizationdetails",
    "tag": "OrganizationRead",
    "summary": "Get the details of organization.",
    "scopes": [
      "organization:read"
    ],
    "risk": "read",
    "parameters": [],
    "responseSchema": "OrganizationDetailsOutputModel"
  },
  {
    "id": "OrganizationDetails_PatchOrganizationDetails",
    "method": "PATCH",
    "path": "/v1/organizationdetails",
    "tag": "OrganizationWrite",
    "summary": "Update (Patch) a organization details or a part of it",
    "scopes": [
      "organization:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "OrganizationDetailsOutputModel"
  },
  {
    "id": "PhaseMembers_GetPhaseMembers",
    "method": "GET",
    "path": "/v1/phases/{phaseGuid}/phasemembers",
    "tag": "ProjectsRead",
    "summary": "Get phase members",
    "description": "Use root phase to get project members.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "phaseGuid",
        "in": "path",
        "required": true,
        "description": "GUID of the phase.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: Page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch.",
        "type": "integer:int32"
      },
      {
        "name": "isActive",
        "in": "query",
        "required": false,
        "description": "Optional: Is the member active on the phase. Filters only root phase members. Default nothing = all.",
        "type": "boolean"
      },
      {
        "name": "isUserActive",
        "in": "query",
        "required": false,
        "description": "Optional: Is the user active. Default nothing = all.",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<PhaseMemberOutputModel>"
  },
  {
    "id": "PhaseMembers_GetAllPhaseMembers",
    "method": "GET",
    "path": "/v1/phasemembers",
    "tag": "ProjectsRead",
    "summary": "Get all active phase members",
    "description": "Use root phase to get project members.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get phase members that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: Page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch.",
        "type": "integer:int32"
      },
      {
        "name": "isUserActive",
        "in": "query",
        "required": false,
        "description": "Optional: Is the user active. Default nothing = all.",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<PhaseMemberOutputModel>"
  },
  {
    "id": "PhaseMembers_PostPhaseMember",
    "method": "POST",
    "path": "/v1/phasemembers",
    "tag": "ProjectsWrite",
    "summary": "Adds a phase member.",
    "description": "User is always added as a root phase (project) member also.",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "addToAllSubPhases",
        "in": "query",
        "required": false,
        "description": "Optional: Add member to all sub phases. Default true.",
        "type": "boolean"
      }
    ],
    "requestSchema": "PhaseMemberModel",
    "responseSchema": "PhaseMemberModel"
  },
  {
    "id": "PhaseMembers_GetAllDeletedPhaseMembers",
    "method": "GET",
    "path": "/v1/deletedphasemembers",
    "tag": "ProjectsRead",
    "summary": "Get all deleted phase members",
    "description": "Use root phase to get project members.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "deletedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get phase members that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: Page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch.",
        "type": "integer:int32"
      },
      {
        "name": "isUserActive",
        "in": "query",
        "required": false,
        "description": "Optional: Is the user active. Default nothing = all.",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<DeletedPhaseMemberOutputModel>"
  },
  {
    "id": "Phases_GetPhases",
    "method": "GET",
    "path": "/v1/phases",
    "tag": "ProjectsRead",
    "summary": "Get the phases.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get phases that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "code",
        "in": "query",
        "required": false,
        "description": "Optional: Code of the phase.",
        "type": "string"
      },
      {
        "name": "projectGuids",
        "in": "query",
        "required": false,
        "description": "Optional: List of project ids.",
        "type": "array",
        "explode": true
      }
    ],
    "responseSchema": "array<PhaseOutputModel>"
  },
  {
    "id": "Phases_PostPhase",
    "method": "POST",
    "path": "/v1/phases",
    "tag": "ProjectsWrite",
    "summary": "Insert a phase",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "PhaseInputModel",
    "responseSchema": "PhaseOutputModel"
  },
  {
    "id": "Phases_GetPhase",
    "method": "GET",
    "path": "/v1/phases/{guid}",
    "tag": "ProjectsRead",
    "summary": "Get phase by ID",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the phase.",
        "type": "string"
      }
    ],
    "responseSchema": "PhaseOutputModel"
  },
  {
    "id": "Phases_PatchPhase",
    "method": "PATCH",
    "path": "/v1/phases/{guid}",
    "tag": "ProjectsWrite",
    "summary": "Update (Patch) a phase or a part of it",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the phase",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<PhaseOutputModel>"
  },
  {
    "id": "Phases_DeletePhase",
    "method": "DELETE",
    "path": "/v1/phases/{guid}",
    "tag": "ProjectsDelete",
    "summary": "Deletes a phase",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "projects:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the phase.",
        "type": "string"
      }
    ]
  },
  {
    "id": "Phases_GetProjectPhases",
    "method": "GET",
    "path": "/v1/projects/{guid}/phaseswithhierarchy",
    "tag": "ProjectsRead",
    "summary": "Get project's phases as flat list",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id of the project.",
        "type": "string"
      }
    ],
    "responseSchema": "array<PhaseModelWithHierarchyInfo>"
  },
  {
    "id": "Phases_GetRootPhases",
    "method": "GET",
    "path": "/v1/rootphaseswithhierarchy",
    "tag": "ProjectsRead",
    "summary": "Get a list of root phases with information about hierarchy.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "customerGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "projectGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "projectKeywordGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "projectStatusTypeGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "salesPersonGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "projectOwnerGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "businessUnitGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "customerOwnerGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "salesStatusTypeGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "openProjects",
        "in": "query",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "projectMemberUserGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      }
    ],
    "responseSchema": "array<PhaseOutputModel>"
  },
  {
    "id": "Activities_GetActivities",
    "method": "GET",
    "path": "/v1/activities",
    "tag": "ActivitiesRead",
    "summary": "Get all activities of an organization",
    "description": "Start and end date times accept values of DateTimeOffset type, based on UTF-8 encoding.",
    "scopes": [
      "activities:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "closed",
        "in": "query",
        "required": false,
        "description": "Optional: Which activities to fetch - open/closed, Default all.",
        "type": "boolean"
      },
      {
        "name": "activityCategories",
        "in": "query",
        "required": false,
        "description": "Optional: activity category for the activities to be fetched. Should be one of Personal/Absences/CalendarEntry/SalesEvent/Task. Default all.",
        "type": "array<ActivityCategory>",
        "explode": true
      },
      {
        "name": "customerGuids",
        "in": "query",
        "required": false,
        "description": "Optional: ID of customer. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "includeTasksWithNoCustomer",
        "in": "query",
        "required": false,
        "description": "Optional: Include the activities that don't have customer. Default is true.",
        "type": "boolean"
      },
      {
        "name": "projectGuids",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the project for the activities to be fetched. If not provided, returns for all projects. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "includeTasksWithNoProject",
        "in": "query",
        "required": false,
        "description": "Optional: Include the activities that don't have project. Default is true.",
        "type": "boolean"
      },
      {
        "name": "projectBusinessUnitGuids",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the business unit of the project based on which activities should be filtered. If not provided, returns for all business units. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "projectOwnerGuids",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the project manager. If not provided, returns for all project managers. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "userGuids",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the user for the activities to be fetched. If not provided, returns for all users. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "includeAsMember",
        "in": "query",
        "required": false,
        "description": "Optional: Include the activities that the user is a member. Effective if userGuid is provided. Default is to not include.",
        "type": "boolean"
      },
      {
        "name": "userKeywordGuids",
        "in": "query",
        "required": false,
        "description": "Optional: User keyword Ids of activity owner to search for.",
        "type": "array",
        "explode": true
      },
      {
        "name": "startDateTime",
        "in": "query",
        "required": false,
        "description": "Optional: starting date and time from which to get the activities in user's timezone. Finds all activities that end after the date time. Format \"2017-04-12T13%3A20%3A00%2b02%3A00\". Default all.",
        "type": "string:date-time"
      },
      {
        "name": "endDateTime",
        "in": "query",
        "required": false,
        "description": "Optional: ending date and time to which to get the activities in user's timezone. Finds all activities that start before or on the date time. Format \"2017-04-12T13%3A20%3A00%2b02%3A00\". Default all. If activities for one day are fetched, give start date time with time as 00:00 with the offset of the timezone and end time as 23:59:59 with the offset.",
        "type": "string:date-time"
      },
      {
        "name": "projectTaskStatusGuids",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the project task status. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "phaseGuids",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the phase for the activities to be fetched. If not provided, returns for all phases. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "includeSubPhases",
        "in": "query",
        "required": false,
        "description": "Optional: If one phase guid is given include activities also from sub phases. If multiple phase guids are given, returns activities only for those regardless of this parameter. Default false.",
        "type": "boolean"
      },
      {
        "name": "contactGuids",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the contact for the activities to be fetched. If not provided, returns for all users. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "hasDuration",
        "in": "query",
        "required": false,
        "description": "Optional: has duration flag for the activity. Default all.",
        "type": "boolean"
      },
      {
        "name": "hasHours",
        "in": "query",
        "required": false,
        "description": "Optional: has any work hour entries associated with the activity. Default all.",
        "type": "boolean"
      },
      {
        "name": "isUnassigned",
        "in": "query",
        "required": false,
        "description": "Optional: is the activity unassigned. Default all.",
        "type": "boolean"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get activities that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "useStrictStartAndEndDateTime",
        "in": "query",
        "required": false,
        "description": "Optional: If given as true returns activities that start after start time and end before end time. If given as false returns activities that start before end time and end after start time. Limit are included in both cases. Default false.",
        "type": "boolean"
      },
      {
        "name": "activityTypeGuids",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the project activity type. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "recurrenceType",
        "in": "query",
        "required": false,
        "description": "Optional: Type of the recurrence. Default returns all not recurring activities, instances and exceptions. (None = not recurring activity)",
        "type": "RecurrenceType"
      },
      {
        "name": "isApproved",
        "in": "query",
        "required": false,
        "description": "Optional: Get activities based on the approval status.",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<ActivityModel>"
  },
  {
    "id": "Activities_PostActivity",
    "method": "POST",
    "path": "/v1/activities",
    "tag": "ActivitiesWrite",
    "summary": "Insert a activity",
    "scopes": [
      "activities:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ActivityModel",
    "responseSchema": "ActivityModel"
  },
  {
    "id": "Activities_GetActivity",
    "method": "GET",
    "path": "/v1/activities/{guid}",
    "tag": "ActivitiesRead",
    "summary": "Get activity by ID",
    "scopes": [
      "activities:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the activity.",
        "type": "string"
      }
    ],
    "responseSchema": "ActivityModel"
  },
  {
    "id": "Activities_PatchActivity",
    "method": "PATCH",
    "path": "/v1/activities/{guid}",
    "tag": "ActivitiesWrite",
    "summary": "Update (Patch) a activity or a part of it",
    "scopes": [
      "activities:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the activity. Can also be comma separate list of IDs to patch multiple activities with one call. When multiple IDs are given, returns model which has list of succeeded activities and list of errors.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ActivityModel>"
  },
  {
    "id": "Activities_DeleteActivity",
    "method": "DELETE",
    "path": "/v1/activities/{guid}",
    "tag": "ActivitiesDelete",
    "summary": "Delete an activity",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if activity can't be found.",
    "scopes": [
      "activities:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the activity to delete",
        "type": "string"
      }
    ]
  },
  {
    "id": "Activities_DeleteExceptions",
    "method": "DELETE",
    "path": "/v1/activities/{guid}/exceptions",
    "tag": "ActivitiesDelete",
    "summary": "Resets exceptions from a recurring activity.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if activity can't be found or is not recurring.",
    "scopes": [
      "activities:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the recurring activity",
        "type": "string"
      }
    ]
  },
  {
    "id": "PhaseStatusTypes_GetPhaseStatusTypes",
    "method": "GET",
    "path": "/v1/phasestatustypes",
    "tag": "SettingsRead",
    "summary": "Get phase status types",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all phase status types, if given as true return only active phase status types, if given as false returns only inactive phase status types",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default all.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<PhaseStatusTypeModel>"
  },
  {
    "id": "PhaseStatusTypes_PostPhaseStatusType",
    "method": "POST",
    "path": "/v1/phasestatustypes",
    "tag": "SettingsWrite",
    "summary": "Insert a phase status type",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "PhaseStatusTypeModel",
    "responseSchema": "PhaseStatusTypeModel"
  },
  {
    "id": "PhaseStatusTypes_GetPhaseStatusType",
    "method": "GET",
    "path": "/v1/phasestatustypes/{guid}",
    "tag": "SettingsRead",
    "summary": "Get phase status type by GUID",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the phase status type.",
        "type": "string"
      }
    ],
    "responseSchema": "PhaseStatusTypeModel"
  },
  {
    "id": "PhaseStatusTypes_PatchPhaseStatusType",
    "method": "PATCH",
    "path": "/v1/phasestatustypes/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a phase status type or a part of it",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the phase status type",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<PhaseStatusTypeModel>"
  },
  {
    "id": "PhaseStatusTypes_DeletePhaseStatusType",
    "method": "DELETE",
    "path": "/v1/phasestatustypes/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete a phase status type",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if phase status type can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the phase status type to delete",
        "type": "string"
      },
      {
        "name": "moveUsagesToGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the phase status type to which to move usages of this phase status type. Default null. If phase status type is in use and usages aren't moved the deletion might fail.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ProjectFees_GetProjectFeesByToken",
    "method": "GET",
    "path": "/v1/projectfees",
    "tag": "FeesRead",
    "summary": "Get the project fees.",
    "scopes": [
      "fees:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Number of rows to fetch",
        "type": "integer:int32"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get project fees that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<ProjectFeeOutputModel>"
  },
  {
    "id": "ProjectFees_PostProjectFee",
    "method": "POST",
    "path": "/v1/projectfees",
    "tag": "FeesWrite",
    "summary": "Insert a project fee.",
    "scopes": [
      "fees:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProjectFeeInputModel",
    "responseSchema": "array<ProjectFeeOutputModel>"
  },
  {
    "id": "ProjectFees_GetUserProjectFees",
    "method": "GET",
    "path": "/v1/users/{userGuid}/projectfees",
    "tag": "FeesRead",
    "summary": "Get all the projectFees for a user",
    "scopes": [
      "fees:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "userGuid",
        "in": "path",
        "required": true,
        "description": "ID of the user.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Number of rows to fetch.",
        "type": "integer:int32"
      },
      {
        "name": "productType",
        "in": "query",
        "required": false,
        "description": "Optional: ProjectFee's product type. if given, it filters the projectFees by the given type. FixedFees (Own work), Materials (Products), Subcontracting.",
        "type": "ProductType"
      },
      {
        "name": "isBillable",
        "in": "query",
        "required": false,
        "description": "Optional: Filter the project fees. If true/false, only the billable/non-billable ones are returned. If null, all are returned. Default is null.",
        "type": "boolean"
      },
      {
        "name": "isBilled",
        "in": "query",
        "required": false,
        "description": "Optional: Filter the project fees. If true/false, only the ones that are/are not invoiced are returned. If null, all are returned. Default is null.",
        "type": "boolean"
      },
      {
        "name": "invoiceableDate",
        "in": "query",
        "required": false,
        "description": "Optional: Filter the project fees. When given, only the ones that are invoiceable before or on the given date are returned. Default is null.",
        "type": "string:date-time"
      },
      {
        "name": "hasPhase",
        "in": "query",
        "required": false,
        "description": "Optional: Filter the project fees. If true/false, only the ones are connected/not-connected to a phase are returned. If null, all are returned. Default is null.",
        "type": "boolean"
      },
      {
        "name": "startDate",
        "in": "query",
        "required": false,
        "description": "Start date search criteria. Only get project fees that have event date from this date.",
        "type": "string:date-time"
      },
      {
        "name": "endDate",
        "in": "query",
        "required": false,
        "description": "End date search criteria. Only get project fees that have event date until this date.",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<ProjectFeeOutputModel>"
  },
  {
    "id": "ProjectFees_GetProjectFeesForProject",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/projectfees",
    "tag": "FeesRead",
    "summary": "Get all the project fees for a project",
    "scopes": [
      "fees:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "ID of the project.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Number of rows to fetch.",
        "type": "integer:int32"
      },
      {
        "name": "productType",
        "in": "query",
        "required": false,
        "description": "Optional: ProjectFee's product type. if given, it filters the projectFees by the given type. FixedFees (Own work), Materials (Products), Subcontracting",
        "type": "ProductType"
      },
      {
        "name": "isBillable",
        "in": "query",
        "required": false,
        "description": "Optional: Filter the project fees. If true/false, only the billable/non-billable ones are returned. If null, all are returned. Default is null.",
        "type": "boolean"
      },
      {
        "name": "isBilled",
        "in": "query",
        "required": false,
        "description": "Optional: Filter the project fees. If true/false, only the ones that are/are not invoiced are returned. If null, all are returned. Default is null.",
        "type": "boolean"
      },
      {
        "name": "invoiceableDate",
        "in": "query",
        "required": false,
        "description": "Optional: Filter the project fees. When given, only the ones that are invoiceable before or on the given date are returned. Default is null.",
        "type": "string:date-time"
      },
      {
        "name": "includeRecurringRules",
        "in": "query",
        "required": false,
        "description": "Optional: Also fetches recurring rules along with project fees. Default is false.",
        "type": "boolean"
      },
      {
        "name": "isBillablePeriodInFuture",
        "in": "query",
        "required": false,
        "description": "Optional. Filter the project fees. If true/false, only the ones that will be billable in the future are returned. If null, all are returned. Default is false.",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<ProjectFeeOutputModel>"
  },
  {
    "id": "ProjectFees_GetInvoiceProjectFees",
    "method": "GET",
    "path": "/v1/invoices/{invoiceGuid}/projectfees",
    "tag": "InvoicesRead",
    "summary": "Get all the project fees on an invoice",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "invoiceGuid",
        "in": "path",
        "required": true,
        "description": "ID of the invoice.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Number of rows to fetch.",
        "type": "integer:int32"
      },
      {
        "name": "productType",
        "in": "query",
        "required": false,
        "description": "Optional: ProjectFee's product type. if given, it filters the projectFees by the given type. FixedFees (Own work), Materials (Products), Subcontracting",
        "type": "ProductType"
      }
    ],
    "responseSchema": "array<ProjectFeeOutputModel>"
  },
  {
    "id": "ProjectFees_GetUninvoicedProjectFeesForInvoice",
    "method": "GET",
    "path": "/v1/invoices/{invoiceGuid}/uninvoicedprojectfees",
    "tag": "InvoicesRead",
    "summary": "Get uninvoiced project fees available for invoice",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "invoiceGuid",
        "in": "path",
        "required": true,
        "description": "ID of the invoice.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Number of rows to fetch.",
        "type": "integer:int32"
      },
      {
        "name": "isBillable",
        "in": "query",
        "required": false,
        "description": "Optional: Filter the project fees. If true/false, only the billable/non-billable ones are returned. If null, all are returned. Default is null.",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<ProjectFeeOutputModel>"
  },
  {
    "id": "ProjectFees_GetInvoiceRowProjectFees",
    "method": "GET",
    "path": "/v1/invoicerows/{invoiceRowGuid}/projectfees",
    "tag": "InvoicesRead",
    "summary": "Get all the project fees on an invoice row",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "invoiceRowGuid",
        "in": "path",
        "required": true,
        "description": "ID of the invoice row.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Number of rows to fetch.",
        "type": "integer:int32"
      },
      {
        "name": "productType",
        "in": "query",
        "required": false,
        "description": "Optional: ProjectFee's product type. if given, it filters the projectFees by the given type. FixedFees (Own work), Materials (Products), Subcontracting",
        "type": "ProductType"
      }
    ],
    "responseSchema": "array<ProjectFeeOutputModel>"
  },
  {
    "id": "ProjectFees_GetDeletedProjectFees",
    "method": "GET",
    "path": "/v1/deletedprojectfees",
    "tag": "FeesRead",
    "summary": "Get the deleted project fees.",
    "scopes": [
      "fees:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "projectGuids",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the project for the deleted project fees to be fetched. If not provided, returns for all projects. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "userGuids",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the user. If not provided, returns for all users. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "deletedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get project fees that have been deleted after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<DeletedProjectFeeModel>"
  },
  {
    "id": "Products_GetProducts",
    "method": "GET",
    "path": "/v1/products",
    "tag": "SettingsRead",
    "summary": "Get all the Products",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Number of rows to fetch",
        "type": "integer:int32"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "type",
        "in": "query",
        "required": false,
        "description": "Product type. if given, it filters the products by the given type.",
        "type": "ProductType"
      },
      {
        "name": "isActive",
        "in": "query",
        "required": false,
        "description": "If not given, return all Products, if given as true return only isActive Products, if given as false returns only inactive Products",
        "type": "boolean"
      },
      {
        "name": "code",
        "in": "query",
        "required": false,
        "description": "Optional: Code of the product.",
        "type": "string"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get products that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<ProductOutputModel>"
  },
  {
    "id": "Products_PostProduct",
    "method": "POST",
    "path": "/v1/products",
    "tag": "SettingsWrite",
    "summary": "Insert a product.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProductInputModel",
    "responseSchema": "ProductOutputModel"
  },
  {
    "id": "Products_GetSearchedProducts",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/productsforproject",
    "tag": "ProjectsRead",
    "summary": "Gets available products for the given project where price information comes from projects price list",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "Id of the project",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Number of rows to fetch",
        "type": "integer:int32"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "type",
        "in": "query",
        "required": false,
        "description": "Product type. if given, it filters the products by the given type",
        "type": "ProductType"
      },
      {
        "name": "includeProductsFromRegistry",
        "in": "query",
        "required": false,
        "description": "Optional: If true returns all the products from registry with project specific prices. If false returns only products specified for the project with project specific prices. Default false.",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<ProductForProjectOutputModel>"
  },
  {
    "id": "ProductCountrySettings_GetProductCountrySettings",
    "method": "GET",
    "path": "/v1/products/{productGuid}/productcountrysettings",
    "tag": "SettingsRead",
    "summary": "Get all the country settings for a product",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "productGuid",
        "in": "path",
        "required": true,
        "description": "GUID of the product.",
        "type": "string"
      }
    ],
    "responseSchema": "array<ProductCountrySettingsModel>"
  },
  {
    "id": "ProductCountrySettings_PostProductCountrySettings",
    "method": "POST",
    "path": "/v1/productcountrysettings",
    "tag": "SettingsWrite",
    "summary": "Insert a product country setting",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProductCountrySettingsModel",
    "responseSchema": "ProductCountrySettingsModel"
  },
  {
    "id": "ProductCountrySettings_PatchProductCountrySettings",
    "method": "PATCH",
    "path": "/v1/productcountrysettings/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a product country setting",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the product country setting",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProductCountrySettingsModel>"
  },
  {
    "id": "ProductCountrySettings_DeleteProductCountrySetting",
    "method": "DELETE",
    "path": "/v1/productcountrysettings/{guid}",
    "tag": "SettingsDelete",
    "summary": "Deletes a product country setting",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if product country setting can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the product country setting.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ProjectBillingCustomers_GetWorkHourPricesForProject",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/projectbillingcustomers",
    "tag": "ProjectsRead",
    "summary": "Get all the billing customers for a project",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "type": "string"
      }
    ],
    "responseSchema": "array<ProjectBillingCustomerModel>"
  },
  {
    "id": "Projects_GetProjects",
    "method": "GET",
    "path": "/v1/projects",
    "tag": "ProjectsRead",
    "summary": "Get all the projects",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "currencyGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of project currency.",
        "type": "string"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get projects that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "salesStatusChangedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get projects for which sales status has been changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "projectStatusChangedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get projects for which status has been changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "isBillable",
        "in": "query",
        "required": false,
        "description": "Optional: When true fetch projects that have something to bill, when false nothing to bill. Default nothing = all.",
        "type": "boolean"
      },
      {
        "name": "customerGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "projectGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "projectKeywordGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "projectStatusTypeGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "salesPersonGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "projectOwnerGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "businessUnitGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "minimumBillableAmount",
        "in": "query",
        "required": false,
        "type": "number:double"
      },
      {
        "name": "customerOwnerGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "invoiceableDate",
        "in": "query",
        "required": false,
        "type": "string:date-time"
      },
      {
        "name": "marketSegmentationGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "salesStatusTypeGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "isClosed",
        "in": "query",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "hasRecurringFees",
        "in": "query",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "companyCurrencyGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "projectMemberUserGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "numbers",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "internal",
        "in": "query",
        "required": false,
        "description": "Optional: Get internal / non-internal projects.",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<ProjectOutputModel>"
  },
  {
    "id": "Projects_PostProject",
    "method": "POST",
    "path": "/v1/projects",
    "tag": "ProjectsWrite",
    "summary": "Insert a project",
    "description": "When creating a new project, the price list property will be ignored, as it is chosen by default.",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProjectInputModelBase",
    "responseSchema": "ProjectOutputModel"
  },
  {
    "id": "Projects_GetSalesCases",
    "method": "GET",
    "path": "/v1/salescases",
    "tag": "ProjectsRead",
    "summary": "Gets the sales cases (sales status is in progress)",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "customerGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "currencyGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "projectGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "projectKeywordGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "projectStatusTypeGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "salesPersonGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "projectOwnerGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "businessUnitGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "minimumBillableAmount",
        "in": "query",
        "required": false,
        "type": "number:double"
      },
      {
        "name": "customerOwnerGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "invoiceableDate",
        "in": "query",
        "required": false,
        "type": "string:date-time"
      },
      {
        "name": "marketSegmentationGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "salesStatusTypeGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "isClosed",
        "in": "query",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "hasRecurringFees",
        "in": "query",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "companyCurrencyGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "projectMemberUserGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "numbers",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      }
    ],
    "responseSchema": "array<ProjectOutputModel>"
  },
  {
    "id": "Projects_GetCustomerProjects",
    "method": "GET",
    "path": "/v1/customers/{customerGuid}/projects",
    "tag": "ProjectsRead",
    "summary": "Get customer's projects",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "customerGuid",
        "in": "path",
        "required": true,
        "description": "Id of the customer.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "isBillable",
        "in": "query",
        "required": false,
        "description": "Optional: When true fetch projects that have something to bill, when false nothing to bill. Default nothing = all.",
        "type": "boolean"
      },
      {
        "name": "currencyGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "projectGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "projectKeywordGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "projectStatusTypeGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "salesPersonGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "projectOwnerGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "businessUnitGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "minimumBillableAmount",
        "in": "query",
        "required": false,
        "type": "number:double"
      },
      {
        "name": "customerOwnerGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "invoiceableDate",
        "in": "query",
        "required": false,
        "type": "string:date-time"
      },
      {
        "name": "marketSegmentationGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "salesStatusTypeGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "isClosed",
        "in": "query",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "hasRecurringFees",
        "in": "query",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "companyCurrencyGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "projectMemberUserGuids",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      },
      {
        "name": "numbers",
        "in": "query",
        "required": false,
        "type": "array",
        "explode": true
      }
    ],
    "responseSchema": "array<ProjectOutputModel>"
  },
  {
    "id": "Projects_GetProject",
    "method": "GET",
    "path": "/v1/projects/{guid}",
    "tag": "ProjectsRead",
    "summary": "Get project by ID",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the project.",
        "type": "string"
      }
    ],
    "responseSchema": "ProjectOutputModel"
  },
  {
    "id": "Projects_PatchProject",
    "method": "PATCH",
    "path": "/v1/projects/{guid}",
    "tag": "ProjectsWrite",
    "summary": "Update (Patch) a project or a part of it",
    "description": "To update current project status, give ProjectStatusTypeGuid and possibly Description. To update current sales status, give SalesStatusTypeGuid (",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the project",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProjectOutputModel>"
  },
  {
    "id": "Projects_DeleteProject",
    "method": "DELETE",
    "path": "/v1/projects/{guid}",
    "tag": "ProjectsDelete",
    "summary": "Delete a project",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if project can't be found.",
    "scopes": [
      "projects:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the project to delete",
        "type": "string"
      }
    ]
  },
  {
    "id": "ProjectTravelExpenses_GetProjectTravelExpenses",
    "method": "GET",
    "path": "/v1/projecttravelexpenses",
    "tag": "TravelsRead",
    "summary": "Get the project travel expenses.",
    "scopes": [
      "travels:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get project travel expenses that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<ProjectTravelExpenseOutputModel>"
  },
  {
    "id": "ProjectTravelExpenses_PostProjectTravelExpense",
    "method": "POST",
    "path": "/v1/projecttravelexpenses",
    "tag": "TravelsWrite",
    "summary": "Insert a project travel expense.",
    "scopes": [
      "travels:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProjectTravelExpenseInputModel",
    "responseSchema": "ProjectTravelExpenseOutputModel"
  },
  {
    "id": "ProjectTravelExpenses_GetProjectTravelExpensesForUser",
    "method": "GET",
    "path": "/v1/users/{userGuid}/projecttravelexpenses",
    "tag": "TravelsRead",
    "summary": "Get all the project travel expenses for a user",
    "scopes": [
      "travels:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "userGuid",
        "in": "path",
        "required": true,
        "description": "ID of the user.",
        "type": "string"
      },
      {
        "name": "startDate",
        "in": "query",
        "required": false,
        "description": "Optional: starting date from which to get the travel expenses. Default all.",
        "type": "string:date"
      },
      {
        "name": "endDate",
        "in": "query",
        "required": false,
        "description": "Optional: starting date to which to get the travel expenses. Default all.",
        "type": "string:date"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "expenseClass",
        "in": "query",
        "required": false,
        "description": "Optional: Class of the expense. Mileage, DailyAllowance or OtherTravelExpense",
        "type": "ExpensesClass"
      },
      {
        "name": "isReimbursed",
        "in": "query",
        "required": false,
        "description": "Optional. Filter the project travel expenses. If true/false, only the ones that are reimbursed are returned. If null, all are returned. Default is null.",
        "type": "boolean"
      },
      {
        "name": "isTravelReimbursementRequired",
        "in": "query",
        "required": false,
        "description": "Optional: Filter the project travel expenses by whether or not the reimbursement is required. Default all.",
        "type": "boolean"
      },
      {
        "name": "travelReimbursementGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the travel reimbursement",
        "type": "string"
      },
      {
        "name": "costCurrencyGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the cost currency.",
        "type": "string"
      }
    ],
    "responseSchema": "array<ProjectTravelExpenseOutputModel>"
  },
  {
    "id": "ProjectTravelExpenses_GetProjectTravelExpensesForProject",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/projecttravelexpenses",
    "tag": "TravelsRead",
    "summary": "Get all the project travel expenses for a project",
    "scopes": [
      "travels:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "ID of the project.",
        "type": "string"
      },
      {
        "name": "isBillable",
        "in": "query",
        "required": false,
        "description": "Optional: Filter the travel expenses. If true/false, only the billable/non-billable ones are returned. If null, all are returned. Default is null.",
        "type": "boolean"
      },
      {
        "name": "isBilled",
        "in": "query",
        "required": false,
        "description": "Optional: Filter the travel expenses. If true/false, only the ones that are/are not invoiced are returned. If null, all are returned. Default is null.",
        "type": "boolean"
      },
      {
        "name": "invoiceableDate",
        "in": "query",
        "required": false,
        "description": "Optional: Filter the project fees. When given, only the ones that are invoiceable before or on the given date are returned. Default is null.",
        "type": "string:date-time"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "isBillablePeriodInFuture",
        "in": "query",
        "required": false,
        "description": "Optional. Filter the project travel expenses. If true/false, only the ones that will be billable in the future are returned. If null, all are returned. Default is false.",
        "type": "boolean"
      },
      {
        "name": "expenseClass",
        "in": "query",
        "required": false,
        "description": "Optional: Class of the expense. Mileage, DailyAllowance or OtherTravelExpense",
        "type": "ExpensesClass"
      }
    ],
    "responseSchema": "array<ProjectTravelExpenseOutputModel>"
  },
  {
    "id": "ProjectTravelExpenses_GetInvoiceProjectTravelExpenses",
    "method": "GET",
    "path": "/v1/invoices/{invoiceGuid}/projecttravelexpenses",
    "tag": "InvoicesRead",
    "summary": "Get all the project travel expenses on an invoice",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "invoiceGuid",
        "in": "path",
        "required": true,
        "description": "ID of the invoice.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "expenseClass",
        "in": "query",
        "required": false,
        "description": "Optional: Class of the expense. Mileage, DailyAllowance or OtherTravelExpense",
        "type": "ExpensesClass"
      }
    ],
    "responseSchema": "array<ProjectTravelExpenseOutputModel>"
  },
  {
    "id": "ProjectTravelExpenses_GetUninvoicedProjectTravelExpensesForInvoice",
    "method": "GET",
    "path": "/v1/invoices/{invoiceGuid}/uninvoicedprojecttravelexpenses",
    "tag": "InvoicesRead",
    "summary": "Get uninvoiced project travel expenses available for invoice",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "invoiceGuid",
        "in": "path",
        "required": true,
        "description": "ID of the invoice.",
        "type": "string"
      },
      {
        "name": "isBillable",
        "in": "query",
        "required": false,
        "description": "Optional: Filter the travel expenses. If true/false, only the billable/non-billable ones are returned. If null, all are returned. Default is null.",
        "type": "boolean"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "expenseClass",
        "in": "query",
        "required": false,
        "description": "Optional: Class of the expense. Mileage, DailyAllowance or OtherTravelExpense",
        "type": "ExpensesClass"
      }
    ],
    "responseSchema": "array<ProjectTravelExpenseOutputModel>"
  },
  {
    "id": "ProjectTravelExpenses_GetInvoiceRowProjectTravelExpenses",
    "method": "GET",
    "path": "/v1/invoicerows/{invoiceRowGuid}/projecttravelexpenses",
    "tag": "InvoicesRead",
    "summary": "Get all the project travel expenses on an invoice row",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "invoiceRowGuid",
        "in": "path",
        "required": true,
        "description": "ID of the invoice row.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "expenseClass",
        "in": "query",
        "required": false,
        "description": "Optional: Class of the expense. Mileage, DailyAllowance or OtherTravelExpense",
        "type": "ExpensesClass"
      }
    ],
    "responseSchema": "array<ProjectTravelExpenseOutputModel>"
  },
  {
    "id": "ProjectTravelExpenses_GetProjectTravelExpensesForTravelReimbursement",
    "method": "GET",
    "path": "/v1/travelreimbursements/{travelReimbursementGuid}/projecttravelexpenses",
    "tag": "TravelsRead",
    "summary": "Get all the project travel expenses for a travel reimbursement",
    "scopes": [
      "travels:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "travelReimbursementGuid",
        "in": "path",
        "required": true,
        "description": "Optional: ID of the travel reimbursement",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "expenseClass",
        "in": "query",
        "required": false,
        "description": "Optional: Class of the expense. Mileage, DailyAllowance or OtherTravelExpense",
        "type": "ExpensesClass"
      }
    ],
    "responseSchema": "array<ProjectTravelExpenseOutputModel>"
  },
  {
    "id": "ProjectTravelExpenses_GetDeletedProjectTravelExpenses",
    "method": "GET",
    "path": "/v1/deletedprojecttravelexpenses",
    "tag": "TravelsRead",
    "summary": "Get the deleted project travel expenses.",
    "scopes": [
      "travels:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "projectGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the project for the deleted project travel expenses to be fetched. If not provided, returns for all projects. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "userGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the user. If not provided, returns for all users. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "deletedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get project travel expenses that have been deleted after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<DeletedProjectTravelExpenseModel>"
  },
  {
    "id": "PublicBearerAuthentication_GetLoginToken",
    "method": "POST",
    "path": "/v1/token",
    "tag": "NoScope",
    "summary": "Can be used to get the login information and access token for the api client.",
    "scopes": [],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ClientCredentials",
    "responseSchema": "PublicAuthenticationOutputModel"
  },
  {
    "id": "PublicBearerAuthentication_GetAccessTokenTokenFromRefreshToken",
    "method": "POST",
    "path": "/v1/refreshtoken",
    "tag": "NoScope",
    "summary": "Get new access token using a refresh token.",
    "scopes": [],
    "risk": "write",
    "parameters": [],
    "requestSchema": "string",
    "responseSchema": "PublicAuthenticationOutputModel"
  },
  {
    "id": "PublicBearerAuthentication_GetAccessTokenJson",
    "method": "POST",
    "path": "/v1/login/oauth/access_token",
    "tag": "NoScope",
    "summary": "Get OAuth2 access token (non standard response).",
    "scopes": [],
    "risk": "write",
    "parameters": [],
    "requestSchema": "AccessTokenCredentials",
    "responseSchema": "PublicAuthenticationOutputModel"
  },
  {
    "id": "PublicBearerAuthentication_GetOAuthTokenJson",
    "method": "POST",
    "path": "/v1/login/oauth/token",
    "tag": "NoScope",
    "summary": "Get OAuth2 access token (OAuth2 specification formatted response).",
    "scopes": [],
    "risk": "write",
    "parameters": [],
    "requestSchema": "AccessTokenCredentials",
    "responseSchema": "OAuthOutputModel"
  },
  {
    "id": "ReimbursedProjectFees_GetInvoiceReimbursedProjectFees",
    "method": "GET",
    "path": "/v1/invoices/{invoiceGuid}/reimbursedprojectfees",
    "tag": "InvoicesRead",
    "summary": "Get all the project fees on an invoice",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "invoiceGuid",
        "in": "path",
        "required": true,
        "description": "ID of the invoice.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Number of rows to fetch",
        "type": "integer:int32"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      }
    ],
    "responseSchema": "array<ReimbursedProjectFeeOutputModel>"
  },
  {
    "id": "ReimbursedProjectFees_GetInvoiceRowReimbursedProjectFees",
    "method": "GET",
    "path": "/v1/invoicerows/{invoiceRowGuid}/reimbursedprojectfees",
    "tag": "InvoicesRead",
    "summary": "Get all the project fees on an invoice row",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "invoiceRowGuid",
        "in": "path",
        "required": true,
        "description": "ID of the invoice row.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Number of rows to fetch",
        "type": "integer:int32"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      }
    ],
    "responseSchema": "array<ReimbursedProjectFeeOutputModel>"
  },
  {
    "id": "SalesStatusTypes_GetSalesStatusTypes",
    "method": "GET",
    "path": "/v1/salesstatustypes",
    "tag": "SettingsRead",
    "summary": "Get all the sales status types",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all sales status types, if given as true return only active sales status types, if given as false returns only inactive sales status types",
        "type": "boolean"
      },
      {
        "name": "salesState",
        "in": "query",
        "required": false,
        "description": "Optional: Get sales status types of the sales state.",
        "type": "SalesStatusType"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: First row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from sales status type name.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=Name&sortings[0].value=Desc &sortings[1].key=Code&sortings[1].value=Asc\"",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<SalesStatusTypeOutputModel>"
  },
  {
    "id": "SalesStatusTypes_PostSalesStatusType",
    "method": "POST",
    "path": "/v1/salesstatustypes",
    "tag": "SettingsWrite",
    "summary": "Insert a sales status type",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "SalesStatusTypeInputModel",
    "responseSchema": "SalesStatusTypeOutputModel"
  },
  {
    "id": "TravelExpenseTypeCountrySettings_GetTravelExpenseTypeCountrySettings",
    "method": "GET",
    "path": "/v1/travelexpensetypes/{travelExpenseTypeGuid}/travelexpensetypecountrysettings",
    "tag": "SettingsRead",
    "summary": "Get all country settings for a travel expense type",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "travelExpenseTypeGuid",
        "in": "path",
        "required": true,
        "description": "Guid of the travel expense type.",
        "type": "string"
      }
    ],
    "responseSchema": "array<TravelExpenseTypeCountrySettingsModel>"
  },
  {
    "id": "TravelExpenseTypeCountrySettings_PostTravelExpenseTypeCountrySettings",
    "method": "POST",
    "path": "/v1/travelexpensetypecountrysettings",
    "tag": "SettingsWrite",
    "summary": "Insert a travel expense type country setting",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "TravelExpenseTypeCountrySettingsModel",
    "responseSchema": "TravelExpenseTypeCountrySettingsModel"
  },
  {
    "id": "TravelExpenseTypeCountrySettings_PatchTravelExpenseTypeCountrySettings",
    "method": "PATCH",
    "path": "/v1/travelexpensetypecountrysettings/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a travel expense type country setting",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the travel expense type country setting",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<TravelExpenseTypeCountrySettingsModel>"
  },
  {
    "id": "TravelExpenseTypeCountrySettings_DeleteTravelExpenseTypeCountrySetting",
    "method": "DELETE",
    "path": "/v1/travelexpensetypecountrysettings/{guid}",
    "tag": "SettingsDelete",
    "summary": "Deletes a travel expense type country setting",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if travel expense type country setting can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the travel expense type country setting.",
        "type": "string"
      }
    ]
  },
  {
    "id": "Users_GetUsers",
    "method": "GET",
    "path": "/v1/users",
    "tag": "UsersRead",
    "summary": "Get users",
    "scopes": [
      "users:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch.",
        "type": "integer:int32"
      },
      {
        "name": "isActive",
        "in": "query",
        "required": false,
        "description": "If not given, return all users, if given as true return only active users, if given as false returns only inactive users",
        "type": "boolean"
      },
      {
        "name": "businessUnitGuids",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the business unit of the user. If not provided, returns for all business units. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "keywordGuids",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the keyword of the user. If not provided, returns for all keywords. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get users that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "supervisorUserGuids",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the supervisor to get subordinates for.",
        "type": "array",
        "explode": true
      },
      {
        "name": "code",
        "in": "query",
        "required": false,
        "description": "Optional: Code of the user.",
        "type": "string"
      },
      {
        "name": "email",
        "in": "query",
        "required": false,
        "description": "Optional: Email address of the user.",
        "type": "string"
      },
      {
        "name": "purpose",
        "in": "query",
        "required": false,
        "description": "Optional: Filter users by purpose.",
        "type": "GetUsersPurpose"
      }
    ],
    "responseSchema": "array<UserOutputModel>"
  },
  {
    "id": "Users_PostUser",
    "method": "POST",
    "path": "/v1/users",
    "tag": "UsersWrite",
    "summary": "Insert an user.",
    "scopes": [
      "users:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "UserInputModel",
    "responseSchema": "UserOutputModel"
  },
  {
    "id": "TravelReimbursements_GetTravelReimbursements",
    "method": "GET",
    "path": "/v1/travelreimbursements",
    "tag": "TravelsRead",
    "summary": "Get travel reimbursements.",
    "scopes": [
      "travels:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch.",
        "type": "integer:int32"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get travel reimbursements that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "travelReimbursementStatusGuids",
        "in": "query",
        "required": false,
        "description": "Optional: List of travel reimbursement status ids.",
        "type": "array",
        "explode": true
      }
    ],
    "responseSchema": "array<TravelReimbursementOutputModel>"
  },
  {
    "id": "TravelReimbursements_PostTravelReimbursement",
    "method": "POST",
    "path": "/v1/travelreimbursements",
    "tag": "TravelsWrite",
    "summary": "Add a travel reimbursement",
    "scopes": [
      "travels:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "addAllUnreimbursedTravelExpenses",
        "in": "query",
        "required": false,
        "description": "Optional: Add all of user's unreimbursed travel expenses to reimbursement. Default is true. If TravelExpenseReimbursementStartDate is given in organization settings, travel expenses are added from that date onwards. If value is false then expenses from includedProjectTravelExpenses list are added.",
        "type": "boolean"
      },
      {
        "name": "includedProjectTravelExpenses",
        "in": "query",
        "required": false,
        "description": "Optional: A list of included projectTravelExpense GUIDs belonging to the user. If addAllUnreimbursedTravelExpenses is true then this list is ignored.",
        "type": "array",
        "explode": true
      }
    ],
    "requestSchema": "TravelReimbursementInputModel",
    "responseSchema": "TravelReimbursementOutputModel"
  },
  {
    "id": "TravelReimbursements_GetTravelReimbursement",
    "method": "GET",
    "path": "/v1/travelreimbursements/{guid}",
    "tag": "TravelsRead",
    "summary": "Get travel reimbursement by ID",
    "scopes": [
      "travels:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of travel reimbursement",
        "type": "string"
      }
    ],
    "responseSchema": "TravelReimbursementOutputModel"
  },
  {
    "id": "TravelReimbursements_PatchTravelReimbursement",
    "method": "PATCH",
    "path": "/v1/travelreimbursements/{guid}",
    "tag": "TravelsWrite",
    "summary": "Update (Patch) a travel reimbursement",
    "scopes": [
      "travels:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the travel reimbursement",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<TravelReimbursementOutputModel>"
  },
  {
    "id": "TravelReimbursements_DeleteTravelReimbursement",
    "method": "DELETE",
    "path": "/v1/travelreimbursements/{guid}",
    "tag": "TravelsDelete",
    "summary": "Delete a travel reimbursement",
    "scopes": [
      "travels:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID of travel reimbursement",
        "type": "string"
      }
    ]
  },
  {
    "id": "Workdays_GetAllWorkdays",
    "method": "GET",
    "path": "/v1/workdays",
    "tag": "UsersRead",
    "summary": "Get all workdays for users.",
    "scopes": [
      "users:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "startDate",
        "in": "query",
        "required": true,
        "description": "Start date of the workdays.",
        "type": "string:date"
      },
      {
        "name": "endDate",
        "in": "query",
        "required": true,
        "description": "End date of the workdays.",
        "type": "string:date"
      },
      {
        "name": "userGuids",
        "in": "query",
        "required": false,
        "description": "Optional: Guids of the users.",
        "type": "array",
        "explode": true
      },
      {
        "name": "isCompleted",
        "in": "query",
        "required": false,
        "description": "Optional: Get only completed workdays.",
        "type": "boolean"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get only workdays that have changed after this date.",
        "type": "string:date-time"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "type": "integer:int32"
      }
    ],
    "responseSchema": "array<WorkdayOutputModel>"
  },
  {
    "id": "Workdays_GetWorkdays",
    "method": "GET",
    "path": "/v1/users/{userGuid}/workdays",
    "tag": "UsersRead",
    "summary": "Get workdays for a user.",
    "scopes": [
      "users:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "userGuid",
        "in": "path",
        "required": true,
        "description": "ID of the user.",
        "type": "string"
      },
      {
        "name": "startDate",
        "in": "query",
        "required": true,
        "description": "Start date of the workdays.",
        "type": "string:date-time"
      },
      {
        "name": "endDate",
        "in": "query",
        "required": true,
        "description": "End date of the workdays.",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<WorkdayModel>"
  },
  {
    "id": "Workdays_PatchWorkDay",
    "method": "PATCH",
    "path": "/v1/users/{userGuid}/workdays/{date}",
    "tag": "UsersWrite",
    "summary": "Update (Patch) a workday or a part of it",
    "scopes": [
      "users:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "userGuid",
        "in": "path",
        "required": true,
        "description": "ID of the user.",
        "type": "string"
      },
      {
        "name": "date",
        "in": "path",
        "required": true,
        "description": "Date of the workday..",
        "type": "string:date-time"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<WorkdayModel>"
  },
  {
    "id": "WorkTypes_GetPhaseWorkTypes",
    "method": "GET",
    "path": "/v1/phases/{phaseGuid}/worktypes",
    "tag": "ProjectsRead",
    "summary": "Get all work types that are available for a phase (for work hour entry)",
    "description": "Only the active work types are included in the list, whether they come from organization settings or project specific work types.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "phaseGuid",
        "in": "path",
        "required": true,
        "description": "Id of the phase.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: number of rows to fetch",
        "type": "integer:int32"
      },
      {
        "name": "userGuid",
        "in": "query",
        "required": false,
        "description": "Id of the user for whom the work types are retrieved. Default is current user.",
        "type": "string"
      }
    ],
    "responseSchema": "array<WorkTypeOutputModel>"
  },
  {
    "id": "VatRates_GetVatRates",
    "method": "GET",
    "path": "/v1/vatrates",
    "tag": "SettingsRead",
    "summary": "Get all organization vat rates",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "countryGuid",
        "in": "query",
        "required": false,
        "description": "If not given, return all vat rates in organizations country. If given return only for that country.",
        "type": "string"
      },
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all vat rates, if given as true return only active ones, if given as false returns only inactive ones.",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<VatRateOutputModel>"
  },
  {
    "id": "VatRates_PostVatRate",
    "method": "POST",
    "path": "/v1/vatrates",
    "tag": "SettingsWrite",
    "summary": "Insert a vat rate",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "VatRateInputModel",
    "responseSchema": "VatRateOutputModel"
  },
  {
    "id": "VatRates_GetVatRate",
    "method": "GET",
    "path": "/v1/vatrates/{guid}",
    "tag": "SettingsRead",
    "summary": "Get a vat rate by GUID",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the vat rate.",
        "type": "string"
      }
    ],
    "responseSchema": "VatRateOutputModel"
  },
  {
    "id": "VatRates_PatchVatRate",
    "method": "PATCH",
    "path": "/v1/vatrates/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a vat rate or a part of it",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID of the vat rate",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<VatRateOutputModel>"
  },
  {
    "id": "VatRates_DeleteVatRate",
    "method": "DELETE",
    "path": "/v1/vatrates/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete a vat rate",
    "description": "Returns: No Content (204) if succeeded. Bad Request (400) if vat rate is the default one. Not Found (404) if vat rate can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID for the vat rate to delete",
        "type": "string"
      }
    ]
  },
  {
    "id": "WorkHours_GetWorkHour",
    "method": "GET",
    "path": "/v1/workhours/{guid}",
    "tag": "HoursRead",
    "summary": "Get work hour by ID",
    "scopes": [
      "hours:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the work hour.",
        "type": "string"
      }
    ],
    "responseSchema": "WorkHourOutputModel"
  },
  {
    "id": "WorkHours_PatchWorkHour",
    "method": "PATCH",
    "path": "/v1/workhours/{guid}",
    "tag": "HoursWrite",
    "summary": "Update (Patch) a work hour or a part of it",
    "scopes": [
      "hours:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the work hour. Can also be comma separate list of IDs to patch multiple work hours with one call. When multiple IDs are given, returns model which has list of succeeded work hours and list of errors.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<WorkHourOutputModel>"
  },
  {
    "id": "WorkHours_DeleteWorkHour",
    "method": "DELETE",
    "path": "/v1/workhours/{guid}",
    "tag": "HoursDelete",
    "summary": "Deletes a work hour.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "hours:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the work hour.",
        "type": "string"
      }
    ]
  },
  {
    "id": "WorkHours_GetWorkHours",
    "method": "GET",
    "path": "/v1/workhours",
    "tag": "HoursRead",
    "summary": "Get the work hours.",
    "scopes": [
      "hours:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get work hours that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "billableStatus",
        "in": "query",
        "required": false,
        "description": "Billable status type",
        "type": "BillableStatusType"
      },
      {
        "name": "eventDateStart",
        "in": "query",
        "required": false,
        "description": "Optional: Get work hours that have event date after this date time (greater or equal).",
        "type": "string:date"
      },
      {
        "name": "eventDateEnd",
        "in": "query",
        "required": false,
        "description": "Optional: Get work hours that have event date before this date time (less or equal).",
        "type": "string:date"
      },
      {
        "name": "businessUnitGuid",
        "in": "query",
        "required": false,
        "description": "Optional: Get work hours for this business unit and hierarchial subunits.",
        "type": "string"
      },
      {
        "name": "isApproved",
        "in": "query",
        "required": false,
        "description": "Optional: Get work hours based on the approval status.",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<WorkHourOutputModel>"
  },
  {
    "id": "WorkHours_PostWorkHour",
    "method": "POST",
    "path": "/v1/workhours",
    "tag": "HoursWrite",
    "summary": "Insert a work hour",
    "scopes": [
      "hours:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "WorkHourInputModel",
    "responseSchema": "WorkHourOutputModel"
  },
  {
    "id": "WorkHours_GetWorkHoursForUser",
    "method": "GET",
    "path": "/v1/users/{userGuid}/workhours",
    "tag": "HoursRead",
    "summary": "Get all the work hours for a user",
    "scopes": [
      "hours:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "userGuid",
        "in": "path",
        "required": true,
        "description": "ID of the user.",
        "type": "string"
      },
      {
        "name": "startDate",
        "in": "query",
        "required": false,
        "description": "Optional: starting date from which to get the hours. Default all.",
        "type": "string:date-time"
      },
      {
        "name": "endDate",
        "in": "query",
        "required": false,
        "description": "Optional: starting date to which to get the hours. Default all.",
        "type": "string:date-time"
      },
      {
        "name": "phaseGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the phase to get the hours for. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "workTypeGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the work type. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      }
    ],
    "responseSchema": "array<WorkHourOutputModel>"
  },
  {
    "id": "WorkHours_GetDeletedWorkHours",
    "method": "GET",
    "path": "/v1/deletedworkhours",
    "tag": "HoursRead",
    "summary": "Get the deleted work hours.",
    "scopes": [
      "hours:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "projectGuids",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the project for the deleted work hours to be fetched. If not provided, returns for all projects. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "userGuids",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the user. If not provided, returns for all users. Default all.",
        "type": "array",
        "explode": true
      },
      {
        "name": "deletedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get work hours that have been deleted after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<DeletedWorkHourModel>"
  },
  {
    "id": "WorkHours_GetProjectWorkHours",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/workhours",
    "tag": "HoursRead",
    "summary": "Get all the work hours for phases of a project for invoicing",
    "scopes": [
      "hours:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "ID of the project.",
        "type": "string"
      },
      {
        "name": "isBillable",
        "in": "query",
        "required": false,
        "description": "Optional: Filter the work hours. If true/false, only the billable/non-billable ones are returned. If null, all are returned. Default is null.",
        "type": "boolean"
      },
      {
        "name": "isBilled",
        "in": "query",
        "required": false,
        "description": "Optional: Filter the work hours. If true/false, only the ones that are/are not invoiced are returned. If null, all are returned. Default is null.",
        "type": "boolean"
      },
      {
        "name": "startDate",
        "in": "query",
        "required": false,
        "description": "Optional: starting date from which to get the hours. Default all.",
        "type": "string:date-time"
      },
      {
        "name": "endDate",
        "in": "query",
        "required": false,
        "description": "Optional: starting date to which to get the hours. Default all.",
        "type": "string:date-time"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      }
    ],
    "responseSchema": "array<WorkHourOutputModel>"
  },
  {
    "id": "WorkHours_GetInvoiceRowWorkHours",
    "method": "GET",
    "path": "/v1/invoicerows/{invoiceRowGuid}/workhours",
    "tag": "InvoicesRead",
    "summary": "Get all the work hours on an invoice row",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "invoiceRowGuid",
        "in": "path",
        "required": true,
        "description": "ID of the invoice row.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      }
    ],
    "responseSchema": "array<WorkHourOutputModel>"
  },
  {
    "id": "WorkHours_GetInvoiceWorkHours",
    "method": "GET",
    "path": "/v1/invoices/{invoiceGuid}/workhours",
    "tag": "InvoicesRead",
    "summary": "Get all the work hours on an invoice",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "invoiceGuid",
        "in": "path",
        "required": true,
        "description": "ID of the invoice.",
        "type": "string"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      }
    ],
    "responseSchema": "array<WorkHourOutputModel>"
  },
  {
    "id": "WorkHours_GetUninvoicedWorkHoursForInvoice",
    "method": "GET",
    "path": "/v1/invoices/{invoiceGuid}/uninvoicedworkhours",
    "tag": "InvoicesRead",
    "summary": "Get uninvoiced work hours available for invoice",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "invoiceGuid",
        "in": "path",
        "required": true,
        "description": "ID of the invoice.",
        "type": "string"
      },
      {
        "name": "isBillable",
        "in": "query",
        "required": false,
        "description": "Optional: Filter the work hours. If true/false, only the billable/non-billable ones are returned. If null, all are returned. Default is null.",
        "type": "boolean"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      }
    ],
    "responseSchema": "array<WorkHourOutputModel>"
  },
  {
    "id": "ProjectStatusTypes_GetProjectStatusTypes",
    "method": "GET",
    "path": "/v1/projectstatustypes",
    "tag": "SettingsRead",
    "summary": "Get all the ProjectStatusTypes",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all ProjectStatusTypes, if given as true return only active ProjectStatusTypes, if given as false returns only inactive ProjectStatusTypes",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from ProjectStatusType name.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=name&sortings[0].value=Asc&sortings[1].key=isActive&sortings[1].value=Asc\"",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<ProjectStatusTypeModel>"
  },
  {
    "id": "ProjectStatusTypes_PostProjectStatusType",
    "method": "POST",
    "path": "/v1/projectstatustypes",
    "tag": "SettingsWrite",
    "summary": "Insert a project status type",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProjectStatusTypeModel",
    "responseSchema": "ProjectStatusTypeModel"
  },
  {
    "id": "ProjectStatusTypes_GetProjectStatusType",
    "method": "GET",
    "path": "/v1/projectstatustypes/{guid}",
    "tag": "SettingsRead",
    "summary": "Get projectStatusType by ID",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the projectStatusType.",
        "type": "string"
      }
    ],
    "responseSchema": "ProjectStatusTypeModel"
  },
  {
    "id": "ProjectStatusTypes_PatchProjectStatusType",
    "method": "PATCH",
    "path": "/v1/projectstatustypes/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a projectStatusType or a part of it",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the projectStatusType",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProjectStatusTypeModel>"
  },
  {
    "id": "ProjectStatusTypes_DeleteProjectStatusType",
    "method": "DELETE",
    "path": "/v1/projectstatustypes/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete a projectStatusType",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if projectStatusType can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the projectStatusType to delete",
        "type": "string"
      },
      {
        "name": "moveUsagesToGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the project status type to which to move usages of this project status type. Default null. If project status type is in use and usages aren't moved the deletion might fail.",
        "type": "string"
      }
    ]
  },
  {
    "id": "SalesStatusHistory_GetSalesStatusHistory",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/salesstatushistory",
    "tag": "ProjectsRead",
    "summary": "Get the sales status history for a project",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "The project for which the sales status history is fetched.",
        "type": "string"
      }
    ],
    "responseSchema": "array<SalesStatusHistoryOutputModel>"
  },
  {
    "id": "ProjectForecasts_GetForecasts",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/projectforecasts",
    "tag": "ProjectsRead",
    "summary": "Get the project forecasts",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "project for the forecasts",
        "type": "string"
      },
      {
        "name": "startDate",
        "in": "query",
        "required": false,
        "description": "Start date of the date range for the forecasts",
        "type": "string:date-time"
      },
      {
        "name": "endDate",
        "in": "query",
        "required": false,
        "description": "End date of the date range for the forecasts",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<ProjectForecastOutputModel>"
  },
  {
    "id": "ProjectForecasts_DeleteForecasts",
    "method": "DELETE",
    "path": "/v1/projects/{projectGuid}/projectforecasts",
    "tag": "ProjectsDelete",
    "summary": "Delete the project forecasts from a month onward, including the given month.",
    "scopes": [
      "projects:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "Project for the forecasts to delete",
        "type": "string"
      },
      {
        "name": "year",
        "in": "query",
        "required": false,
        "description": "Year where to start deleting the forecasts",
        "type": "integer:int32"
      },
      {
        "name": "month",
        "in": "query",
        "required": false,
        "description": "Month where to start deleting the forecasts",
        "type": "integer:int32"
      }
    ]
  },
  {
    "id": "ProjectForecasts_GetForecast",
    "method": "GET",
    "path": "/v1/projectforecasts/{guid}",
    "tag": "ProjectsRead",
    "summary": "Get project forecast by ID",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the project forecast.",
        "type": "string"
      }
    ],
    "responseSchema": "ProjectForecastOutputModel"
  },
  {
    "id": "ProjectForecasts_PatchForecast",
    "method": "PATCH",
    "path": "/v1/projectforecasts/{guid}",
    "tag": "ProjectsWrite",
    "summary": "Update (Patch) an project forecast or a part of it",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the project forecast",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProjectForecastOutputModel>"
  },
  {
    "id": "ProjectForecasts_DeleteForecast",
    "method": "DELETE",
    "path": "/v1/projectforecasts/{guid}",
    "tag": "ProjectsDelete",
    "summary": "Delete a project forecast",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if product can't be found.",
    "scopes": [
      "projects:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the project forecast to delete",
        "type": "string"
      }
    ]
  },
  {
    "id": "ProjectForecasts_PostForecast",
    "method": "POST",
    "path": "/v1/projectforecasts",
    "tag": "ProjectsWrite",
    "summary": "Insert a project forecast",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProjectForecastInputModel",
    "responseSchema": "ProjectForecastOutputModel"
  },
  {
    "id": "BankAccounts_GetBankAccounts",
    "method": "GET",
    "path": "/v1/bankaccounts",
    "tag": "SettingsRead",
    "summary": "Get all bank accounts for current organization.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "companyGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the company.",
        "type": "string"
      },
      {
        "name": "businessUnitGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the business unit.",
        "type": "string"
      },
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, returns all bank accounts, if given as true returns only active bank accounts, if given as false returns only inactive bank accounts.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from bank account name.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=BankName&sortings[0].value=Desc &sortings[1].key=BusinessUnitName&sortings[1].value=Asc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<BankAccountOutputModel>"
  },
  {
    "id": "BankAccounts_GetBankAccount",
    "method": "GET",
    "path": "/v1/bankaccounts/{guid}",
    "tag": "SettingsRead",
    "summary": "Get bank account by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the bank account.",
        "type": "string"
      }
    ],
    "responseSchema": "BankAccountOutputModel"
  },
  {
    "id": "Currencies_GetCurrencies",
    "method": "GET",
    "path": "/v1/currencies",
    "tag": "SettingsRead",
    "summary": "Get all the Currencies",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all Currencies, if given as true return only active Currencies, if given as false returns only inactive Currencies.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text based search applied to the result. Matches currency name and code.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=name&sortings[0].value=Asc\". Using additional sorting fields \"CreatedDate\" and / or \"LastUpdatedDate\" as keys sort currencies without a timestamp provided when sorting with other date fields.",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<CurrencyOutputModel>"
  },
  {
    "id": "Currencies_GetCurrency",
    "method": "GET",
    "path": "/v1/currencies/{guid}",
    "tag": "SettingsRead",
    "summary": "Get currency by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the currency.",
        "type": "string"
      }
    ],
    "responseSchema": "CurrencyOutputModel"
  },
  {
    "id": "Currencies_PatchCurrency",
    "method": "PATCH",
    "path": "/v1/currencies/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) an currency or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the currency.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<CurrencyOutputModel>"
  },
  {
    "id": "FlatRates_GetFlatrate",
    "method": "GET",
    "path": "/v1/flatrates/{guid}",
    "tag": "FeesRead",
    "summary": "Get flat rate.",
    "scopes": [
      "fees:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id of the flat rate.",
        "type": "string"
      }
    ],
    "responseSchema": "array<FlatRateOutputModel>"
  },
  {
    "id": "FlatRates_PatchFlatRate",
    "method": "PATCH",
    "path": "/v1/flatrates/{guid}",
    "tag": "FeesWrite",
    "summary": "Update (Patch) a flat rate or a part of it.",
    "scopes": [
      "fees:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the flat rate.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<FlatRateOutputModel>"
  },
  {
    "id": "FlatRates_DeleteFlatRate",
    "method": "DELETE",
    "path": "/v1/flatrates/{guid}",
    "tag": "FeesDelete",
    "summary": "Delete a flat rate of a phase.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "fees:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of flat rate.",
        "type": "string"
      }
    ]
  },
  {
    "id": "FlatRates_GetFlatratesForProject",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/flatrates",
    "tag": "FeesRead",
    "summary": "Get project's flat rates.",
    "scopes": [
      "fees:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "Id of the project.",
        "type": "string"
      }
    ],
    "responseSchema": "array<FlatRateOutputModel>"
  },
  {
    "id": "PriceLists_GetPricelists",
    "method": "GET",
    "path": "/v1/pricelists",
    "tag": "SettingsRead",
    "summary": "Get all price lists.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all price lists, if given as true return only active price lists, if given as false returns only inactive price lists.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from price list name.",
        "type": "string"
      },
      {
        "name": "currencyGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the price list currency.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      },
      {
        "name": "name",
        "in": "query",
        "required": false,
        "description": "Optional: Name of the price list.",
        "type": "string"
      }
    ],
    "responseSchema": "array<PriceListOutputModel>"
  },
  {
    "id": "PriceLists_PostCustomPricelist",
    "method": "POST",
    "path": "/v1/projects/{projectGuid}/pricelists/custom",
    "tag": "ProjectsWrite",
    "summary": "Create custom price list for a project. If project already has a custom price list returns existing price list.\nCreates a new price list if project doesn't have a custom price list.\nProject can only have one custom price list.\nNote that project's price list will be changed to the custom price list created here and\nalso existing prices are copied to the new price list.",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "ID of the project.",
        "type": "string"
      },
      {
        "name": "isVolumePricing",
        "in": "query",
        "required": false,
        "description": "Get the custom volume pricing price list or regular custom price list. Default is false.",
        "type": "boolean"
      }
    ],
    "responseSchema": "CustomPriceListOutputModel"
  },
  {
    "id": "PriceListVersions_GetPricelistVersionsByPricelist",
    "method": "GET",
    "path": "/v1/pricelists/{pricelistGuid}/pricelistversions",
    "tag": "SettingsRead",
    "summary": "Get all price list versions of a price list.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pricelistGuid",
        "in": "path",
        "required": true,
        "type": "string"
      }
    ],
    "responseSchema": "array<PricelistVersionOutputModel>"
  },
  {
    "id": "PriceListVersions_GetPricelistVersion",
    "method": "GET",
    "path": "/v1/pricelistversions/{guid}",
    "tag": "SettingsRead",
    "summary": "Get a price list version by guid.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "type": "string"
      }
    ],
    "responseSchema": "PricelistVersionOutputModel"
  },
  {
    "id": "ProductPrices_GetProductPrices",
    "method": "GET",
    "path": "/v1/pricelistversions/{pricelistVersionGuid}/productprices",
    "tag": "SettingsRead",
    "summary": "Get all the product prices for a price list version.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pricelistVersionGuid",
        "in": "path",
        "required": true,
        "description": "ID of the price list version.",
        "type": "string"
      },
      {
        "name": "fromPricelistOnly",
        "in": "query",
        "required": false,
        "description": "If true return only prices from the price list, if false also returns prices from the products. Default is false.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from Product name.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate the number of total rows. Default false = total row count is returned as zero.",
        "type": "boolean"
      },
      {
        "name": "productCode",
        "in": "query",
        "required": false,
        "description": "Optional: Absolute search for products with specified product code.",
        "type": "string"
      },
      {
        "name": "productGuids",
        "in": "query",
        "required": false,
        "description": "Optional: Search all product price(s) by products guid(s).",
        "type": "array",
        "explode": true
      },
      {
        "name": "isVolumePriced",
        "in": "query",
        "required": false,
        "description": "Optional: If true, return only volume priced products. If false, return all non volume priced products. Default is null, which means return all products.",
        "type": "boolean"
      },
      {
        "name": "productCategoryGuids",
        "in": "query",
        "required": false,
        "description": "Optional: Search product prices according to product category / categories by product category guid(s).",
        "type": "array",
        "explode": true
      },
      {
        "name": "productTypes",
        "in": "query",
        "required": false,
        "description": "Optional: Search product prices according to product type / types.",
        "type": "array<ProductType>",
        "explode": true
      }
    ],
    "responseSchema": "array<ProductPriceOutputModel>"
  },
  {
    "id": "ProductPrices_GetProductPricesForProject",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/productprices",
    "tag": "ProjectsRead",
    "summary": "Get all the productPrices for a project.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "ID of the project.",
        "type": "string"
      },
      {
        "name": "fromPricelistOnly",
        "in": "query",
        "required": false,
        "description": "If true return only prices from the price list, if false also returns prices from the products. Default is false.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from Product name.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate the number of total rows. Default false = total row count is returned as zero.",
        "type": "boolean"
      },
      {
        "name": "isAvailable",
        "in": "query",
        "required": false,
        "description": "Optional: If true, returns only prices that are available for the project, false returns price that are not available. Default all.",
        "type": "boolean"
      },
      {
        "name": "productCode",
        "in": "query",
        "required": false,
        "description": "Optional: Absolute search for products with specified product code.",
        "type": "string"
      },
      {
        "name": "productGuids",
        "in": "query",
        "required": false,
        "description": "Optional: Search all product price(s) by products guid(s).",
        "type": "array",
        "explode": true
      },
      {
        "name": "isVolumePriced",
        "in": "query",
        "required": false,
        "description": "Optional: If true, return only volume priced products. If false, return all non volume priced products. Default is null, which means return all products.",
        "type": "boolean"
      },
      {
        "name": "productCategoryGuids",
        "in": "query",
        "required": false,
        "description": "Optional: Search product prices according to product category / categories by product category guid(s).",
        "type": "array",
        "explode": true
      },
      {
        "name": "productTypes",
        "in": "query",
        "required": false,
        "description": "Optional: Search product prices according to product type / types.",
        "type": "array<ProductType>",
        "explode": true
      }
    ],
    "responseSchema": "array<ProductPriceOutputModel>"
  },
  {
    "id": "ProductPrices_GetProductPrice",
    "method": "GET",
    "path": "/v1/productprices/{guid}",
    "tag": "SettingsRead",
    "summary": "Get product price by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the product price.",
        "type": "string"
      }
    ],
    "responseSchema": "ProductPriceOutputModel"
  },
  {
    "id": "Products_GetProduct",
    "method": "GET",
    "path": "/v1/products/{guid}",
    "tag": "SettingsRead",
    "summary": "Get product by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the product.",
        "type": "string"
      }
    ],
    "responseSchema": "ProductOutputModel"
  },
  {
    "id": "Products_PatchProduct",
    "method": "PATCH",
    "path": "/v1/products/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) an product or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the product.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProductOutputModel>"
  },
  {
    "id": "Products_DeleteProduct",
    "method": "DELETE",
    "path": "/v1/products/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete a product.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if product can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the product to delete.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ProjectFees_GetProjectFee",
    "method": "GET",
    "path": "/v1/projectfees/{guid}",
    "tag": "FeesRead",
    "summary": "Get projectFee by ID.",
    "scopes": [
      "fees:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the projectFee.",
        "type": "string"
      }
    ],
    "responseSchema": "ProjectFeeOutputModel"
  },
  {
    "id": "ProjectFees_PatchProjectFee",
    "method": "PATCH",
    "path": "/v1/projectfees/{guid}",
    "tag": "FeesWrite",
    "summary": "Update (Patch) a projectFee or a part of it.",
    "scopes": [
      "fees:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the project fee Can also be comma separate list of IDs to patch multiple project fees with one call. When multiple IDs are given, returns model which has list of succeeded project fees and list of errors.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProjectFeeOutputModel>"
  },
  {
    "id": "ProjectFees_DeleteProjectFree",
    "method": "DELETE",
    "path": "/v1/projectfees/{guid}",
    "tag": "FeesDelete",
    "summary": "Deletes a project fee.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "fees:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the project fee.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ProjectMemberCostExceptions_GetProjectMemberCostException",
    "method": "GET",
    "path": "/v1/projectmembercostexceptions/{guid}",
    "tag": "SettingsRead",
    "summary": "Get project member cost exception by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the cost exception.",
        "type": "string"
      }
    ],
    "responseSchema": "ProjectMemberCostExceptionOutputModel"
  },
  {
    "id": "ProjectMemberCostExceptions_Patch",
    "method": "PATCH",
    "path": "/v1/projectmembercostexceptions/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) project member cost exception.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the project member cost exception.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProjectMemberCostExceptionOutputModel>"
  },
  {
    "id": "ProjectMemberCostExceptions_Delete",
    "method": "DELETE",
    "path": "/v1/projectmembercostexceptions/{guid}",
    "tag": "SettingsDelete",
    "summary": "Deletes a project member cost exception.",
    "description": "Deletes project member cost exception. Returns: No Content (204) if succeeded.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the project member cost exception.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ProjectMemberCostExceptions_GetProjectMemberCostExceptionsForUser",
    "method": "GET",
    "path": "/v1/users/{userGuid}/projectmembercostexceptions",
    "tag": "UsersRead",
    "summary": "Get all cost exceptions of project members for user.",
    "scopes": [
      "users:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "userGuid",
        "in": "path",
        "required": true,
        "description": "Guid of the user.",
        "type": "string"
      },
      {
        "name": "isProjectClosed",
        "in": "query",
        "required": false,
        "description": "Search only for open or closed projects. Default all projects.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      }
    ],
    "responseSchema": "array<ProjectMemberCostExceptionOutputModel>"
  },
  {
    "id": "ProjectMemberCostExceptions_GetProjectMemberCostExceptionsForProject",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/projectmembercostexceptions",
    "tag": "ProjectsRead",
    "summary": "Get all cost exceptions of project members for a project.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "Guid of the project.",
        "type": "string"
      },
      {
        "name": "userGuid",
        "in": "query",
        "required": false,
        "description": "Optional: Guid of the user.",
        "type": "string"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      }
    ],
    "responseSchema": "array<ProjectMemberCostExceptionOutputModel>"
  },
  {
    "id": "ProjectMemberCostExceptions_Post",
    "method": "POST",
    "path": "/v1/projectmembercostexceptions",
    "tag": "SettingsWrite",
    "summary": "Add a cost exception to a project member.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProjectMemberCostExceptionInputModel",
    "responseSchema": "ProjectMemberCostExceptionOutputModel"
  },
  {
    "id": "ProjectRecurringFeeRules_GetProjectRecurringFeeRules",
    "method": "GET",
    "path": "/v1/projectrecurringfeerules",
    "tag": "FeesRead",
    "summary": "Get the recurring fee rules.",
    "scopes": [
      "fees:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "productType",
        "in": "query",
        "required": false,
        "description": "projectRecurringFeeRule's product type. if given, it filters the projectRecurringFeeRules by the given type.",
        "type": "ProductType"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get recurring fee rules that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<ProjectRecurringFeeRuleOutputModel>"
  },
  {
    "id": "ProjectRecurringFeeRules_PostProjectRecurringFeeRule",
    "method": "POST",
    "path": "/v1/projectrecurringfeerules",
    "tag": "FeesWrite",
    "summary": "Insert a projectRecurringFeeRule.",
    "scopes": [
      "fees:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProjectRecurringFeeRuleInputModel",
    "responseSchema": "array<ProjectRecurringFeeRuleOutputModel>"
  },
  {
    "id": "ProjectRecurringFeeRules_GetProjectRecurringFeeRulesForProject",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/projectrecurringfeerules",
    "tag": "FeesRead",
    "summary": "Get all the Recurring Fee Rules for a project",
    "scopes": [
      "fees:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "ID of the project to get the recurring fee rules.",
        "type": "string"
      },
      {
        "name": "productType",
        "in": "query",
        "required": false,
        "description": "projectRecurringFeeRule's product type. if given, it filters the projectRecurringFeeRules by the given type.",
        "type": "ProductType"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "isBillablePeriodInFuture",
        "in": "query",
        "required": false,
        "description": "Optional. Filter the project recurring fee rules. If true/false, only the ones that will be billable in the future are returned. If null, all are returned. Default is false.",
        "type": "boolean"
      },
      {
        "name": "billableTimePeriod",
        "in": "query",
        "required": false,
        "description": "the time period for any uninvoiced recurring rules.",
        "type": "BillablePeriod"
      }
    ],
    "responseSchema": "array<ProjectRecurringFeeRuleOutputModel>"
  },
  {
    "id": "ProjectRecurringFeeRules_GetProjectRecurringFeeRule",
    "method": "GET",
    "path": "/v1/projectrecurringfeerules/{guid}",
    "tag": "FeesRead",
    "summary": "Get project's RecurringFeeRule by ID.",
    "scopes": [
      "fees:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the ProjectRecurringFeeRule.",
        "type": "string"
      },
      {
        "name": "includeInactive",
        "in": "query",
        "required": false,
        "description": "Indicates the rule should be returned even if it is not active. Default is false.",
        "type": "boolean"
      }
    ],
    "responseSchema": "ProjectRecurringFeeRuleOutputModel"
  },
  {
    "id": "ProjectRecurringFeeRules_PatchProjectRecurringFeeRule",
    "method": "PATCH",
    "path": "/v1/projectrecurringfeerules/{guid}",
    "tag": "FeesWrite",
    "summary": "Update (Patch) a projectRecurringFeeRule or a part of it.",
    "scopes": [
      "fees:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the projectRecurringFeeRule.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProjectRecurringFeeRuleOutputModel>"
  },
  {
    "id": "ProjectRecurringFeeRules_DeleteProjectRecurringFeeRule",
    "method": "DELETE",
    "path": "/v1/projectrecurringfeerules/{guid}",
    "tag": "FeesDelete",
    "summary": "Deletes a projectRecurringFeeRule.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "fees:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the project recurring fee rule.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ProjectTravelExpenses_GetProjectTravelExpense",
    "method": "GET",
    "path": "/v1/projecttravelexpenses/{guid}",
    "tag": "TravelsRead",
    "summary": "Get project travel expense by ID.",
    "scopes": [
      "travels:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the project travel expense.",
        "type": "string"
      }
    ],
    "responseSchema": "ProjectTravelExpenseOutputModel"
  },
  {
    "id": "ProjectTravelExpenses_PatchProjectTravelExpense",
    "method": "PATCH",
    "path": "/v1/projecttravelexpenses/{guid}",
    "tag": "TravelsWrite",
    "summary": "Update (Patch) a project travel expense or a part of it.",
    "scopes": [
      "travels:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the project travel expense.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProjectTravelExpenseOutputModel>"
  },
  {
    "id": "ProjectTravelExpenses_DeleteProjectTravelExpense",
    "method": "DELETE",
    "path": "/v1/projecttravelexpenses/{guid}",
    "tag": "TravelsDelete",
    "summary": "Deletes a project travel expense.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "travels:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the project travel expense.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ReimbursedProjectTravelExpenses_GetInvoiceProjectTravelExpenses",
    "method": "GET",
    "path": "/v1/invoices/{invoiceGuid}/reimbursedprojecttravelexpenses",
    "tag": "InvoicesRead",
    "summary": "Get all the project travel expenses on an invoice.",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "invoiceGuid",
        "in": "path",
        "required": true,
        "description": "ID of the invoice.",
        "type": "string"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default all.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Searched string: part of name or description.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional. If true, calculates the total count of project fees. Default false.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (sub-model fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=Name&sortings[0].value=Desc&sortings[1].key=Number&sortings[1].value=Asc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<ReimbursedProjectTravelExpenseOutputModel>"
  },
  {
    "id": "ReimbursedProjectTravelExpenses_GetInvoiceRowProjectTravelExpenses",
    "method": "GET",
    "path": "/v1/invoicerows/{invoiceRowGuid}/reimbursedprojecttravelexpenses",
    "tag": "InvoicesRead",
    "summary": "Get all the project travel expenses on an invoice row.",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "invoiceRowGuid",
        "in": "path",
        "required": true,
        "description": "ID of the invoice row.",
        "type": "string"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default all.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Searched string: part of name or description.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional. If true, calculates the total count of project fees. Default false.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (sub-model fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=Name&sortings[0].value=Desc&sortings[1].key=Number&sortings[1].value=Asc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<ReimbursedProjectTravelExpenseOutputModel>"
  },
  {
    "id": "ReimbursedWorkHours_GetInvoiceReimbursedWorkHours",
    "method": "GET",
    "path": "/v1/invoices/{invoiceGuid}/reimbursedworkhours",
    "tag": "InvoicesRead",
    "summary": "Get all reimbursed hours on an invoice.",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "invoiceGuid",
        "in": "path",
        "required": true,
        "description": "ID of the invoice.",
        "type": "string"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from description or invoice description.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (sub-model fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=DueDate&sortings[0].value=Asc&sortings[1].key=TotalIncludingTax&sortings[1].value=Desc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<ReimbursedWorkHourOutputModel>"
  },
  {
    "id": "ReimbursedWorkHours_GetInvoiceRowReimbursedWorkHours",
    "method": "GET",
    "path": "/v1/invoicerows/{invoiceRowGuid}/reimbursedworkhours",
    "tag": "InvoicesRead",
    "summary": "Get all reimbursed hours on an invoice row.",
    "scopes": [
      "invoices:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "invoiceRowGuid",
        "in": "path",
        "required": true,
        "description": "ID of the invoice row.",
        "type": "string"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from description or invoice description.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (sub-model fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=DueDate&sortings[0].value=Asc&sortings[1].key=TotalIncludingTax&sortings[1].value=Desc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<ReimbursedWorkHourOutputModel>"
  },
  {
    "id": "TeamProductivity_GetTeamProductivity",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/teamproductivity",
    "tag": "ProjectsRead",
    "summary": "Get team productivity of a project.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "GUID of the project.",
        "type": "string"
      }
    ],
    "responseSchema": "array<TeamProductivityOutputModel>"
  },
  {
    "id": "TravelExpenseTypes_GetTravelExpenseTypes",
    "method": "GET",
    "path": "/v1/travelexpensetypes",
    "tag": "SettingsRead",
    "summary": "Get all the travel expense types.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all travel expense types, if given as true return only active travel expense types, if given as false returns only inactive travel expense types.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default all.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Searched string: part of name or code.",
        "type": "string"
      },
      {
        "name": "code",
        "in": "query",
        "required": false,
        "description": "Optional: Code of the travel expense type.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=IsActive&sortings[0].value=Asc&sortings[1].key=Name&sortings[1].value=Desc.",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get travel expense types that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<TravelExpenseTypeOutputModel>"
  },
  {
    "id": "TravelExpenseTypes_PostTravelExpenseType",
    "method": "POST",
    "path": "/v1/travelexpensetypes",
    "tag": "SettingsWrite",
    "summary": "Insert a new travel expense type.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "TravelExpenseTypeInputModel",
    "responseSchema": "TravelExpenseTypeOutputModel"
  },
  {
    "id": "TravelExpenseTypes_GetTravelExpenseType",
    "method": "GET",
    "path": "/v1/travelexpensetypes/{guid}",
    "tag": "SettingsRead",
    "summary": "Get travel expense type by guid.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the travel expense type.",
        "type": "string"
      }
    ],
    "responseSchema": "TravelExpenseTypeOutputModel"
  },
  {
    "id": "TravelExpenseTypes_PatchTravelExpenseType",
    "method": "PATCH",
    "path": "/v1/travelexpensetypes/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) an travel expense type or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Guid of the travel expense type.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<TravelExpenseTypeOutputModel>"
  },
  {
    "id": "TravelExpenseTypes_DeleteTravelExpenseType",
    "method": "DELETE",
    "path": "/v1/travelexpensetypes/{guid}",
    "tag": "SettingsDelete",
    "summary": "Deletes a travel expense type.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Guid for the travel expense type to delete.",
        "type": "string"
      }
    ]
  },
  {
    "id": "TravelExpenseTypes_GetSearchedTravelExpenseTypes",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/travelexpensetypes",
    "tag": "ProjectsRead",
    "summary": "Search active travel expense types of project by part of the name or code.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "Id of the project.",
        "type": "string"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Searched string: part of name or code.",
        "type": "string"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default all.",
        "type": "integer:int32"
      },
      {
        "name": "userGuid",
        "in": "query",
        "required": false,
        "description": "Optional: Id of the user to fetch travels for.",
        "type": "string"
      },
      {
        "name": "expenseClass",
        "in": "query",
        "required": false,
        "description": "Optional: Expense class of the travel. Mileage/DailyAllowance/OtherTravelExpense.",
        "type": "ExpensesClass"
      }
    ],
    "responseSchema": "array<TravelExpenseTypeOutputModel>"
  },
  {
    "id": "TravelPrices_GetTravelPrices",
    "method": "GET",
    "path": "/v1/pricelistversions/{pricelistVersionGuid}/travelprices",
    "tag": "SettingsRead",
    "summary": "Get all the travel prices for a price list version.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pricelistVersionGuid",
        "in": "path",
        "required": true,
        "description": "ID of the price list version.",
        "type": "string"
      },
      {
        "name": "fromPricelistOnly",
        "in": "query",
        "required": false,
        "description": "If true return only prices from the price list, if false also returns prices from the products. Default is false.",
        "type": "boolean"
      },
      {
        "name": "expenseClasses",
        "in": "query",
        "required": false,
        "description": "Optional: List of expense classes to search by, defaults to all travel categories.",
        "type": "array<ExpensesClass>",
        "explode": true
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from Product name.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate the number of total rows. Default false = total row count is returned as zero.",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<TravelPriceOutputModel>"
  },
  {
    "id": "TravelPrices_GetTravelPricesForProject",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/travelprices",
    "tag": "ProjectsRead",
    "summary": "Get all the travel prices for a project.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "ID of the project.",
        "type": "string"
      },
      {
        "name": "fromPricelistOnly",
        "in": "query",
        "required": false,
        "description": "If true return only prices from the price list, if false also returns prices from the settings. Default is false.",
        "type": "boolean"
      },
      {
        "name": "expenseClasses",
        "in": "query",
        "required": false,
        "description": "Optional: List of expense classes to search by, defaults to all travel categories.",
        "type": "array<ExpensesClass>",
        "explode": true
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from Product name.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate the number of total rows. Default false = total row count is returned as zero.",
        "type": "boolean"
      }
    ],
    "responseSchema": "array<TravelPriceOutputModel>"
  },
  {
    "id": "TravelPrices_GetTravelPrice",
    "method": "GET",
    "path": "/v1/travelprices/{guid}",
    "tag": "SettingsRead",
    "summary": "Get travel price by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the travel price.",
        "type": "string"
      }
    ],
    "responseSchema": "TravelPriceOutputModel"
  },
  {
    "id": "Users_GetUser",
    "method": "GET",
    "path": "/v1/users/{guid}",
    "tag": "UsersRead",
    "summary": "Get user by ID.",
    "scopes": [
      "users:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the user.",
        "type": "string"
      }
    ],
    "responseSchema": "UserOutputModel"
  },
  {
    "id": "Users_PatchUser",
    "method": "PATCH",
    "path": "/v1/users/{guid}",
    "tag": "UsersWrite",
    "summary": "Update (Patch) an user or a part of it.",
    "scopes": [
      "users:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the user.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<UserOutputModel>"
  },
  {
    "id": "Users_DeleteUser",
    "method": "DELETE",
    "path": "/v1/users/{guid}",
    "tag": "UsersDelete",
    "summary": "Delete an user.",
    "description": "No Content (204) if succeeded. Bad Request (400) if user can't be deleted. Not Found (404) if the user can't be found.",
    "scopes": [
      "users:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the user.",
        "type": "string"
      }
    ]
  },
  {
    "id": "WorkTypes_GetWorkTypes",
    "method": "GET",
    "path": "/v1/worktypes",
    "tag": "SettingsRead",
    "summary": "Get all work types.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "Filter the work types. If true/false, only the active/inactive ones are returned. If null, all the work types are returned.",
        "type": "boolean"
      },
      {
        "name": "productive",
        "in": "query",
        "required": false,
        "description": "Filter the work types. If true/false, only the productive/non-productive ones are returned. If null, all the work types are returned.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from work type name or code.",
        "type": "string"
      },
      {
        "name": "code",
        "in": "query",
        "required": false,
        "description": "Optional: Code of the work type.",
        "type": "string"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get work types that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=name&sortings[0].value=Asc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<WorkTypeOutputModel>"
  },
  {
    "id": "WorkTypes_PostWorkType",
    "method": "POST",
    "path": "/v1/worktypes",
    "tag": "SettingsWrite",
    "summary": "Insert a work type.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "WorkTypeInputModel",
    "responseSchema": "WorkTypeOutputModel"
  },
  {
    "id": "WorkTypes_GetWorkType",
    "method": "GET",
    "path": "/v1/worktypes/{guid}",
    "tag": "SettingsRead",
    "summary": "Get work type by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the work type.",
        "type": "string"
      }
    ],
    "responseSchema": "WorkTypeOutputModel"
  },
  {
    "id": "WorkTypes_PatchWorkType",
    "method": "PATCH",
    "path": "/v1/worktypes/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a work type or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the work type.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<WorkTypeOutputModel>"
  },
  {
    "id": "WorkTypes_DeleteWorkType",
    "method": "DELETE",
    "path": "/v1/worktypes/{guid}",
    "tag": "SettingsDelete",
    "summary": "Deletes a work type.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the work type.",
        "type": "string"
      },
      {
        "name": "moveUsagesToGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the work type to which to move usages of this work type. Default null. If work type is in use and usages aren't moved the deletion might fail.",
        "type": "string"
      }
    ]
  },
  {
    "id": "WorkTypes_GetSearchedWorktypes",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/worktypesforproject",
    "tag": "ProjectsRead",
    "summary": "Search active work types by part of the name or code.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "Id of the case to which proposal is connected.",
        "type": "string"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Searched string: part of name or code.",
        "type": "string"
      }
    ],
    "responseSchema": "array<WorktypeForProjectOutputModel>"
  },
  {
    "id": "PublicBearerAuthentication_Logout",
    "method": "POST",
    "path": "/v1/signout",
    "tag": "NoScope",
    "summary": "Logout. Invalidates refresh token. Access token will be invalid when it expires.",
    "scopes": [],
    "risk": "write",
    "parameters": [],
    "requestSchema": "string",
    "responseSchema": "string:binary"
  },
  {
    "id": "PublicBearerAuthentication_GetAuthorizationCode",
    "method": "GET",
    "path": "/v1/login/oauth/authorize",
    "tag": "NoScope",
    "summary": "Get the oAuth2 authorization code flow code.",
    "scopes": [],
    "risk": "read",
    "parameters": [
      {
        "name": "response_type",
        "in": "query",
        "required": false,
        "description": "code",
        "type": "string"
      },
      {
        "name": "state",
        "in": "query",
        "required": false,
        "description": "Unguessable random string.",
        "type": "string"
      },
      {
        "name": "client_id",
        "in": "query",
        "required": false,
        "description": "Client id.",
        "type": "string"
      },
      {
        "name": "redirect_uri",
        "in": "query",
        "required": false,
        "description": "Url where to redirect after code has been retrieved.",
        "type": "string"
      },
      {
        "name": "scope",
        "in": "query",
        "required": false,
        "description": "Scopes that client requests. If scopes that are not allowed for the client are requested, returns unauthorized.",
        "type": "string"
      }
    ]
  },
  {
    "id": "Customers_GetCustomer",
    "method": "GET",
    "path": "/v1/customers/{guid}",
    "tag": "CustomersRead",
    "summary": "Get customer by GUID.",
    "scopes": [
      "customers:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID used to get the customer.",
        "type": "string"
      }
    ],
    "responseSchema": "CustomerModel"
  },
  {
    "id": "Customers_PatchCustomer",
    "method": "PATCH",
    "path": "/v1/customers/{guid}",
    "tag": "CustomersWrite",
    "summary": "Update (Patch) an customer or a part of it.",
    "scopes": [
      "customers:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the customer.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<CustomerModel>"
  },
  {
    "id": "Customers_DeleteCustomer",
    "method": "DELETE",
    "path": "/v1/customers/{guid}",
    "tag": "CustomersDelete",
    "summary": "Deletes a customer.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "customers:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the customer.",
        "type": "string"
      }
    ]
  },
  {
    "id": "Organizations_GetVismaFinancialsCompanyInfo",
    "method": "GET",
    "path": "/v1/integrations/vismafinancials/companyinformation",
    "tag": "OrganizationRead",
    "summary": "Get Visma.net Financials integration company information.",
    "scopes": [
      "organization:read"
    ],
    "risk": "read",
    "parameters": [],
    "responseSchema": "VismaFinancialsCompanyModel"
  },
  {
    "id": "OvertimePrices_GetOvertimePrices",
    "method": "GET",
    "path": "/v1/pricelistversions/{pricelistVersionGuid}/overtimeprices",
    "tag": "SettingsRead",
    "summary": "Get all the overtime prices for a price list version.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "pricelistVersionGuid",
        "in": "path",
        "required": true,
        "type": "string"
      }
    ],
    "responseSchema": "array<OvertimePriceModel>"
  },
  {
    "id": "OvertimePrices_GetOvertimePricesForProject",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/overtimeprices",
    "tag": "ProjectsRead",
    "summary": "Get all the overtimePrices for a project.",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "type": "string"
      }
    ],
    "responseSchema": "array<OvertimePriceModel>"
  },
  {
    "id": "OvertimePrices_GetOvertimePrice",
    "method": "GET",
    "path": "/v1/overtimeprices/{guid}",
    "tag": "SettingsRead",
    "summary": "Get overtime price by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the overtime price.",
        "type": "string"
      }
    ],
    "responseSchema": "OvertimePriceModel"
  },
  {
    "id": "Overtimes_GetOvertimes",
    "method": "GET",
    "path": "/v1/overtimes",
    "tag": "SettingsRead",
    "summary": "Get overtime definitions.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all overtime definitions, if given as true return only active overtime definitions, if given as false returns only inactive overtime definitions.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default all.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from overtime name.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=name&sortings[0].value=Asc\"\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<OvertimeModel>"
  },
  {
    "id": "Overtimes_PostOvertime",
    "method": "POST",
    "path": "/v1/overtimes",
    "tag": "SettingsWrite",
    "summary": "Insert an overtime.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "OvertimeModel",
    "responseSchema": "OvertimeModel"
  },
  {
    "id": "Overtimes_GetOvertime",
    "method": "GET",
    "path": "/v1/overtimes/{guid}",
    "tag": "SettingsRead",
    "summary": "Get overtime definition by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the overtime definition.",
        "type": "string"
      }
    ],
    "responseSchema": "OvertimeModel"
  },
  {
    "id": "Overtimes_PatchOvertime",
    "method": "PATCH",
    "path": "/v1/overtimes/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) an overtime or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the overtime.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<OvertimeModel>"
  },
  {
    "id": "Overtimes_DeleteOvertime",
    "method": "DELETE",
    "path": "/v1/overtimes/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete an overtime.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if overtime can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the overtime to delete.",
        "type": "string"
      }
    ]
  },
  {
    "id": "PhaseMembers_PostPhaseMembersFromBusinessUnitUsers",
    "method": "POST",
    "path": "/v1/phasemembersfrombusinessunitusers",
    "tag": "ProjectsWrite",
    "summary": "Adds business unit users to phase members.",
    "description": "Users are always added as a root phase (project) member also.",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "addToAllSubPhases",
        "in": "query",
        "required": false,
        "description": "Optional: Add member to all sub phases. Default true.",
        "type": "boolean"
      }
    ],
    "requestSchema": "PhaseMembersFromBusinessUnitUsersModel",
    "responseSchema": "array<PhaseMemberModel>"
  },
  {
    "id": "PhaseMembers_DeletePhaseMember",
    "method": "DELETE",
    "path": "/v1/phasemembers/{userGuid}",
    "tag": "ProjectsDelete",
    "summary": "Deletes a phase member",
    "description": "Returns: No Content (204) if succeeded. Only one of transferToRoleGuid and transferToUserGuid can be provided. Use root phase to delete a project member.",
    "scopes": [
      "projects:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "userGuid",
        "in": "path",
        "required": true,
        "description": "GUID of the phase member to remove",
        "type": "string"
      },
      {
        "name": "resourceAllocationAction",
        "in": "query",
        "required": false,
        "description": "Optional: The action to be applied to the user's resource allocations",
        "type": "ResourceAllocationAction"
      },
      {
        "name": "transferToUserGuid",
        "in": "query",
        "required": false,
        "description": "Optional: GUID of the user to whom the resource allocations are transferred.",
        "type": "string"
      }
    ],
    "requestSchema": "PhaseMemberModel"
  },
  {
    "id": "ProjectBillingCustomers_PostProjectBillingCustomer",
    "method": "POST",
    "path": "/v1/projectbillingcustomers",
    "tag": "SettingsWrite",
    "summary": "Insert a billing customer for a project.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProjectBillingCustomerModel2",
    "responseSchema": "ProjectBillingCustomerModel2"
  },
  {
    "id": "ProjectBillingCustomers_GetProjectBillingCustomer",
    "method": "GET",
    "path": "/v1/projectbillingcustomers/{guid}",
    "tag": "SettingsRead",
    "summary": "Get a project billing customer.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the project billing customer.",
        "type": "string"
      }
    ],
    "responseSchema": "ProjectBillingCustomerModel2"
  },
  {
    "id": "ProjectBillingCustomers_PatchProjectBillingCustomer",
    "method": "PATCH",
    "path": "/v1/projectbillingcustomers/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a project billing customer.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the project billing customer.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProjectBillingCustomerModel2>"
  },
  {
    "id": "ProjectBillingCustomers_DeleteProjectBillingCustomer",
    "method": "DELETE",
    "path": "/v1/projectbillingcustomers/{guid}",
    "tag": "SettingsDelete",
    "summary": "Deletes a project billing customer.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID of the project billing customer to remove.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ProjectProducts_DeleteProjectProduct",
    "method": "DELETE",
    "path": "/v1/projectproducts/{guid}",
    "tag": "ProjectsDelete",
    "summary": "Deletes a project product.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "projects:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID of the project product to remove.",
        "type": "string"
      }
    ]
  },
  {
    "id": "ProjectTaskStatuses_GetProjectTaskStatuses",
    "method": "GET",
    "path": "/v1/projecttaskstatuses",
    "tag": "SettingsRead",
    "summary": "Get the project task statuses.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "If not given, return all project task statuses, if given as true return only active project task statuses, if given as false returns only inactive project task statuses.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from activity type name.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=name&sortings[0].value=Asc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<ProjectTaskStatusModel>"
  },
  {
    "id": "ProjectTaskStatuses_PostProjectTaskStatus",
    "method": "POST",
    "path": "/v1/projecttaskstatuses",
    "tag": "SettingsWrite",
    "summary": "Insert a project task status.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ProjectTaskStatusModel",
    "responseSchema": "ProjectTaskStatusModel"
  },
  {
    "id": "ProjectTaskStatuses_GetProjectTaskStatus",
    "method": "GET",
    "path": "/v1/projecttaskstatuses/{guid}",
    "tag": "SettingsRead",
    "summary": "Get Project task status by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the Project task status.",
        "type": "string"
      }
    ],
    "responseSchema": "ProjectTaskStatusModel"
  },
  {
    "id": "ProjectTaskStatuses_PatchProjectTaskStatus",
    "method": "PATCH",
    "path": "/v1/projecttaskstatuses/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) an Project task status or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the Project task status.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ProjectTaskStatusModel>"
  },
  {
    "id": "ProjectTaskStatuses_DeleteProjectTaskStatus",
    "method": "DELETE",
    "path": "/v1/projecttaskstatuses/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete a project task status.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if product can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the project task status to delete.",
        "type": "string"
      },
      {
        "name": "moveUsagesToGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the project task status to which to move usages of this project task status. Default null.",
        "type": "string"
      }
    ]
  },
  {
    "id": "TimeEntries_GetTimeEntries",
    "method": "GET",
    "path": "/v1/timeentries",
    "tag": "HoursRead",
    "summary": "Get the time entries.",
    "scopes": [
      "hours:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "phaseGuid",
        "in": "query",
        "required": false,
        "description": "Optional: Filters time entries for given phases.",
        "type": "array",
        "explode": true
      },
      {
        "name": "timeEntryTypeGuid",
        "in": "query",
        "required": false,
        "description": "Optional: Filters time entries for given time entry types.",
        "type": "array",
        "explode": true
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get time entries that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "array<TimeEntryModel>"
  },
  {
    "id": "TimeEntries_PostTimeEntry",
    "method": "POST",
    "path": "/v1/timeentries",
    "tag": "HoursWrite",
    "summary": "Insert a time entry.",
    "scopes": [
      "hours:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "TimeEntryModel",
    "responseSchema": "array<TimeEntryModel>"
  },
  {
    "id": "TimeEntries_GetTimeEntriesForUser",
    "method": "GET",
    "path": "/v1/users/{userGuid}/timeentries",
    "tag": "HoursRead",
    "summary": "Get all the time entries for a user.",
    "scopes": [
      "hours:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "userGuid",
        "in": "path",
        "required": true,
        "description": "ID of the user.",
        "type": "string"
      },
      {
        "name": "startDate",
        "in": "query",
        "required": false,
        "description": "Optional: starting date from which to get the time entries. Default all.",
        "type": "string:date-time"
      },
      {
        "name": "endDate",
        "in": "query",
        "required": false,
        "description": "Optional: starting date to which to get the time entries. Default all.",
        "type": "string:date-time"
      },
      {
        "name": "phaseGuid",
        "in": "query",
        "required": false,
        "description": "Optional: Filters time entries for given phases.",
        "type": "array",
        "explode": true
      },
      {
        "name": "timeEntryTypeGuid",
        "in": "query",
        "required": false,
        "description": "Optional: Filters time entries for given time entry types.",
        "type": "array",
        "explode": true
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      }
    ],
    "responseSchema": "array<TimeEntryModel>"
  },
  {
    "id": "TimeEntries_GetTimeEntry",
    "method": "GET",
    "path": "/v1/timeentries/{guid}",
    "tag": "HoursRead",
    "summary": "Get time entry by ID.",
    "scopes": [
      "hours:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "Id used to get the time entry.",
        "type": "string"
      }
    ],
    "responseSchema": "TimeEntryModel"
  },
  {
    "id": "TimeEntries_PatchTimeEntry",
    "method": "PATCH",
    "path": "/v1/timeentries/{guid}",
    "tag": "HoursWrite",
    "summary": "Update (Patch) a time entry or a part of it.",
    "scopes": [
      "hours:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the time entry.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<TimeEntryModel>"
  },
  {
    "id": "TimeEntries_DeleteTimeEntry",
    "method": "DELETE",
    "path": "/v1/timeentries/{guid}",
    "tag": "HoursDelete",
    "summary": "Deletes a time entry.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "hours:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the time entry.",
        "type": "string"
      }
    ]
  },
  {
    "id": "TimeEntryTypes_GetTimeEntryTypes",
    "method": "GET",
    "path": "/v1/timeentrytypes",
    "tag": "SettingsRead",
    "summary": "Get all time entry types.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "Filter the time entry types. If true/false, only the active/inactive ones are returned. If null, all the time entry types are returned.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from time entry type name.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculates the total row count.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=name&sortings[0].value=Asc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<TimeEntryTypeModel>"
  },
  {
    "id": "TimeEntryTypes_PostTimeEntryType",
    "method": "POST",
    "path": "/v1/timeentrytypes",
    "tag": "SettingsWrite",
    "summary": "Insert a time entry type.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "TimeEntryTypeModel",
    "responseSchema": "TimeEntryTypeModel"
  },
  {
    "id": "TimeEntryTypes_GetTimeEntryType",
    "method": "GET",
    "path": "/v1/timeentrytypes/{guid}",
    "tag": "SettingsRead",
    "summary": "Get time entry type by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID used to get the time entry type.",
        "type": "string"
      }
    ],
    "responseSchema": "TimeEntryTypeModel"
  },
  {
    "id": "TimeEntryTypes_PatchTimeEntryType",
    "method": "PATCH",
    "path": "/v1/timeentrytypes/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a time entry type or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the time entry type.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<TimeEntryTypeModel>"
  },
  {
    "id": "TimeEntryTypes_DeleteTimeEntryType",
    "method": "DELETE",
    "path": "/v1/timeentrytypes/{guid}",
    "tag": "SettingsDelete",
    "summary": "Deletes a time entry type.",
    "description": "Returns: No Content (204) if succeeded.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to delete the time entry type.",
        "type": "string"
      }
    ]
  },
  {
    "id": "Timezones_GetTimezones",
    "method": "GET",
    "path": "/v1/localization/timezones",
    "tag": "SettingsRead",
    "summary": "Get all the timezones.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [],
    "responseSchema": "array<TimezoneModel>"
  },
  {
    "id": "Timezones_GetTimezone",
    "method": "GET",
    "path": "/v1/localization/timezones/{guid}",
    "tag": "SettingsRead",
    "summary": "Get timezone by ID.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the timezone.",
        "type": "string"
      }
    ],
    "responseSchema": "TimezoneModel"
  },
  {
    "id": "TravelReimbursementStatus_GetTravelReimbursementStatuses",
    "method": "GET",
    "path": "/v1/travelreimbursementstatuses",
    "tag": "SettingsRead",
    "summary": "Get the travel reimbursement statuses.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "active",
        "in": "query",
        "required": false,
        "description": "Optional: Filter the travel reimbursement statuses. If true/false, only the active/inactive ones are returned. If null, all the travel reimbursement statuses are returned.",
        "type": "boolean"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "textToSearch",
        "in": "query",
        "required": false,
        "description": "Optional: Text to search from travel reimbursement name.",
        "type": "string"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Any sortable field name (submodel fields not supported) in the model can be used, while value can be \"Desc\" or \"Asc\". Example: \"?sortings[0].key=name&sortings[0].value=Asc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<TravelReimbursementStatusModel>"
  },
  {
    "id": "TravelReimbursementStatus_PostTravelReimbursementStatus",
    "method": "POST",
    "path": "/v1/travelreimbursementstatuses",
    "tag": "SettingsWrite",
    "summary": "Insert a travel reimbursement status.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "TravelReimbursementStatusModel",
    "responseSchema": "TravelReimbursementStatusModel"
  },
  {
    "id": "TravelReimbursementStatus_GetTravelReimbursementStatus",
    "method": "GET",
    "path": "/v1/travelreimbursementstatuses/{guid}",
    "tag": "SettingsRead",
    "summary": "Get the travel reimbursement statuses by guid.",
    "scopes": [
      "settings:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "reimbursement status id to get.",
        "type": "string"
      }
    ],
    "responseSchema": "TravelReimbursementStatusModel"
  },
  {
    "id": "TravelReimbursementStatus_PatchTravelReimbursementStatus",
    "method": "PATCH",
    "path": "/v1/travelreimbursementstatuses/{guid}",
    "tag": "SettingsWrite",
    "summary": "Update (Patch) a travel reimbursement status or a part of it.",
    "scopes": [
      "settings:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the travel reimbursement status.",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<TravelReimbursementStatusModel>"
  },
  {
    "id": "TravelReimbursementStatus_DeleteTravelReimbursementStatus",
    "method": "DELETE",
    "path": "/v1/travelreimbursementstatuses/{guid}",
    "tag": "SettingsDelete",
    "summary": "Delete a travel reimbursement status.",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if travel reimbursement status can't be found.",
    "scopes": [
      "settings:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID for the travel reimbursement status to delete.",
        "type": "string"
      },
      {
        "name": "moveUsagesToGuid",
        "in": "query",
        "required": false,
        "description": "Optional: ID of the travel reimbursement status to which to move usages of this travel reimbursement status. Default null. If travel reimbursement status is in use and usages aren't moved the deletion might fail.",
        "type": "string"
      }
    ]
  },
  {
    "id": "DeputyProjectOwners_GetDeputyProjectOwners",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/deputyprojectowners",
    "tag": "ProjectsRead",
    "summary": "Get deputy project owners of a project",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "description": "GUID of the project.",
        "type": "string"
      },
      {
        "name": "firstRow",
        "in": "query",
        "required": false,
        "description": "Optional: first row to fetch. Default 0 = first row.",
        "type": "integer:int32"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: How many rows to fetch, Default 20, maximum 100.",
        "type": "integer:int32"
      },
      {
        "name": "calculateRowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Calculate total number of rows.",
        "type": "boolean"
      },
      {
        "name": "sortings",
        "in": "query",
        "required": false,
        "description": "Optional: A list of Key-Value pairs, containing names of fields and directions by which the results should be sorted. Example: \"?sortings[0].key=name&sortings[0].value=Asc\".",
        "type": "array<KeyValuePairOfStringAndSortDirection>",
        "explode": true
      }
    ],
    "responseSchema": "array<DeputyProjectOwnerOutputModel>"
  },
  {
    "id": "DeputyProjectOwners_GetDeputyProjectOwner",
    "method": "GET",
    "path": "/v1/deputyprojectowners/{guid}",
    "tag": "ProjectsRead",
    "summary": "Get a deputy project owner by GUID",
    "scopes": [
      "projects:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID of the deputy project owner.",
        "type": "string"
      }
    ],
    "responseSchema": "DeputyProjectOwnerOutputModel"
  },
  {
    "id": "DeputyProjectOwners_DeleteDeputyProjectOwner",
    "method": "DELETE",
    "path": "/v1/deputyprojectowners/{guid}",
    "tag": "ProjectsWrite",
    "summary": "Delete a deputy project owner",
    "scopes": [
      "projects:write"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID of the deputy project owner.",
        "type": "string"
      }
    ]
  },
  {
    "id": "DeputyProjectOwners_PostDeputyProjectOwner",
    "method": "POST",
    "path": "/v1/deputyprojectowners",
    "tag": "ProjectsWrite",
    "summary": "Add a deputy project owner to a project",
    "scopes": [
      "projects:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "DeputyProjectOwnerInputModel",
    "responseSchema": "DeputyProjectOwnerOutputModel"
  },
  {
    "id": "ResourceAllocations_GetResourceAllocations",
    "method": "GET",
    "path": "/v1/resourceallocations",
    "tag": "ResourceallocationsRead",
    "summary": "Get resource allocations",
    "scopes": [
      "resourceallocations:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Number of rows to fetch.",
        "type": "integer:int32"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get resource allocations that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "responseSchema": "ResourceAllocationOutputModel"
  },
  {
    "id": "ResourceAllocations_PostResourceAllocation",
    "method": "POST",
    "path": "/v1/resourceallocations",
    "tag": "ResourceallocationsWrite",
    "summary": "Insert a resource allocation",
    "scopes": [
      "resourceallocations:write"
    ],
    "risk": "write",
    "parameters": [],
    "requestSchema": "ResourceAllocationInputModel",
    "responseSchema": "ResourceAllocationOutputModel"
  },
  {
    "id": "ResourceAllocations_PostResourceAllocations",
    "method": "POST",
    "path": "/v1/resourceallocations/allocations",
    "tag": "ResourceallocationsRead",
    "summary": "Get resource allocations (its POST because of being able to accommodate more filters)",
    "scopes": [
      "resourceallocations:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Number of rows to fetch.",
        "type": "integer:int32"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get resource allocations that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      }
    ],
    "requestSchema": "ResourceAllocationCriteriaModel",
    "responseSchema": "array<ResourceAllocationOutputModel>"
  },
  {
    "id": "ResourceAllocations_GetResourceAllocationsByUserGuid",
    "method": "GET",
    "path": "/v1/users/{userGuid}/resourceallocations/allocations",
    "tag": "ResourceallocationsRead",
    "summary": "Get resource allocations for a user with required filters (startDate and endDate or changedSince, max 30 days to be fetched at once)",
    "scopes": [
      "resourceallocations:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "userGuid",
        "in": "path",
        "required": true,
        "type": "string"
      },
      {
        "name": "startDate",
        "in": "query",
        "required": false,
        "description": "Get resource allocations with startDate. Using startDate and endDate or changedSince parameters are required to fetch a maximum of 30 days",
        "type": "string:date-time"
      },
      {
        "name": "endDate",
        "in": "query",
        "required": false,
        "description": "Get resource allocations with endDate. Using startDate and endDate or changedSince parameters are required to fetch a maximum of 30 days",
        "type": "string:date-time"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get resource allocations that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "userLicenseTypes",
        "in": "query",
        "required": false,
        "type": "array<LicenseUserType>",
        "explode": true
      },
      {
        "name": "phaseGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "projectGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "projectBusinessUnitGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "userBusinessUnitGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "projectManagerUserGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "userTagGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "useSalesProbability",
        "in": "query",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "projectStatusTypeGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "projectTagGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "superiorUserGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "salesStatusTypeGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "resourceAllocationGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "salesProgress",
        "in": "query",
        "required": false,
        "type": "SalesProgress"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Number of rows to fetch.",
        "type": "integer:int32"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      }
    ],
    "responseSchema": "ResourceAllocationOutputModel"
  },
  {
    "id": "ResourceAllocations_GetResourceAllocationsByProjectGuid",
    "method": "GET",
    "path": "/v1/projects/{projectGuid}/resourceallocations/allocations",
    "tag": "ResourceallocationsRead",
    "summary": "Get resource allocations for a project with required filters (startDate and endDate or changedSince, max 30 days to be fetched at once)",
    "scopes": [
      "resourceallocations:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "projectGuid",
        "in": "path",
        "required": true,
        "type": "string"
      },
      {
        "name": "startDate",
        "in": "query",
        "required": false,
        "description": "Get resource allocations with startDate. Using startDate and endDate or changedSince parameters are required to fetch a maximum of 30 days",
        "type": "string:date-time"
      },
      {
        "name": "endDate",
        "in": "query",
        "required": false,
        "description": "Get resource allocations with endDate. Using startDate and endDate or changedSince parameters are required to fetch a maximum of 30 days",
        "type": "string:date-time"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get resource allocations that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "userLicenseTypes",
        "in": "query",
        "required": false,
        "type": "array<LicenseUserType>",
        "explode": true
      },
      {
        "name": "phaseGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "userGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "projectBusinessUnitGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "userBusinessUnitGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "projectManagerUserGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "userTagGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "useSalesProbability",
        "in": "query",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "projectStatusTypeGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "projectTagGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "superiorUserGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "salesStatusTypeGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "resourceAllocationGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "salesProgress",
        "in": "query",
        "required": false,
        "type": "SalesProgress"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Number of rows to fetch.",
        "type": "integer:int32"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      }
    ],
    "responseSchema": "ResourceAllocationOutputModel"
  },
  {
    "id": "ResourceAllocations_GetResourceAllocationsByPhaseGuid",
    "method": "GET",
    "path": "/v1/phases/{phaseGuid}/resourceallocations/allocations",
    "tag": "ResourceallocationsRead",
    "summary": "Get resource allocations for a phase with required filters (startDate and endDate or changedSince, max 30 days to be fetched at once)",
    "scopes": [
      "resourceallocations:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "phaseGuid",
        "in": "path",
        "required": true,
        "type": "string"
      },
      {
        "name": "startDate",
        "in": "query",
        "required": false,
        "description": "Get resource allocations with startDate. Using startDate and endDate or changedSince parameters are required to fetch a maximum of 30 days",
        "type": "string:date-time"
      },
      {
        "name": "endDate",
        "in": "query",
        "required": false,
        "description": "Get resource allocations with endDate. Using startDate and endDate or changedSince parameters are required to fetch a maximum of 30 days",
        "type": "string:date-time"
      },
      {
        "name": "changedSince",
        "in": "query",
        "required": false,
        "description": "Optional: Get resource allocations that have been added or changed after this date time (greater or equal).",
        "type": "string:date-time"
      },
      {
        "name": "userLicenseTypes",
        "in": "query",
        "required": false,
        "type": "array<LicenseUserType>",
        "explode": true
      },
      {
        "name": "projectGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "userGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "projectBusinessUnitGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "userBusinessUnitGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "projectManagerUserGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "userTagGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "useSalesProbability",
        "in": "query",
        "required": false,
        "type": "boolean"
      },
      {
        "name": "projectStatusTypeGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "projectTagGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "superiorUserGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "salesStatusTypeGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "resourceAllocationGuid",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "salesProgress",
        "in": "query",
        "required": false,
        "type": "SalesProgress"
      },
      {
        "name": "rowCount",
        "in": "query",
        "required": false,
        "description": "Optional: Number of rows to fetch.",
        "type": "integer:int32"
      },
      {
        "name": "pageToken",
        "in": "query",
        "required": false,
        "description": "Optional: page token to fetch the next page.",
        "type": "string"
      }
    ],
    "responseSchema": "ResourceAllocationOutputModel"
  },
  {
    "id": "ResourceAllocations_GetResourceAllocation",
    "method": "GET",
    "path": "/v1/resourceallocations/{guid}",
    "tag": "ResourceallocationsRead",
    "summary": "Get resource allocation by ID",
    "scopes": [
      "resourceallocations:read"
    ],
    "risk": "read",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "GUID used to get the resource allocation.",
        "type": "string"
      }
    ],
    "responseSchema": "ResourceAllocationOutputModel"
  },
  {
    "id": "ResourceAllocations_PatchResourceAllocation",
    "method": "PATCH",
    "path": "/v1/resourceallocations/{guid}",
    "tag": "ResourceallocationsWrite",
    "summary": "Update (Patch) a resource allocation or a part of it",
    "scopes": [
      "resourceallocations:write"
    ],
    "risk": "write",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the resource allocation",
        "type": "string"
      }
    ],
    "requestSchema": "array<PatchOperation>",
    "responseSchema": "array<ResourceAllocationOutputModel>"
  },
  {
    "id": "ResourceAllocations_DeleteResourceAllocation",
    "method": "DELETE",
    "path": "/v1/resourceallocations/{guid}",
    "tag": "ResourceallocationsDelete",
    "summary": "Delete an resource allocation",
    "description": "Returns: No Content (204) if succeeded. Not found (404) if resource allocation can't be found.",
    "scopes": [
      "resourceallocations:delete"
    ],
    "risk": "destructive",
    "parameters": [
      {
        "name": "guid",
        "in": "path",
        "required": true,
        "description": "ID of the resource allocation to delete",
        "type": "string"
      }
    ]
  }
] as const satisfies readonly SeveraCatalogOperation[];
export const SEVERA_SCHEMAS = {
  "AddressModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "addressline": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "postalCode": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "city": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isBillingAddress": {
        "type": "boolean",
        "required": false
      },
      "isPostalAddress": {
        "type": "boolean",
        "required": false
      },
      "isVisitAddress": {
        "type": "boolean",
        "required": false
      },
      "phone": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "fax": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "country": {
        "type": "AddressCountry",
        "nullable": true,
        "required": false
      },
      "countryRegion": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "customer": {
        "type": "AddressCustomer",
        "nullable": true,
        "required": false
      },
      "contacts": {
        "type": "array<ModelWithName>",
        "nullable": true,
        "required": false
      }
    }
  },
  "UserWithFirstNameLastNameAndPhotoFileModel": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "firstName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "lastName": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "AddressCountry": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "englishName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "hasRegions": {
        "type": "CountryRegionsStatus",
        "readOnly": true,
        "required": false
      }
    }
  },
  "CountryRegionsStatus": {
    "type": "string",
    "enum": [
      "NoRegion",
      "Unknown",
      "HasRegions"
    ],
    "description": "",
    "properties": {}
  },
  "ModelWithName": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "AddressCustomer": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "ExceptionModel": {
    "type": "object",
    "properties": {
      "error": {
        "type": "ErrorModel",
        "nullable": true,
        "required": false
      }
    }
  },
  "ErrorModel": {
    "type": "object",
    "properties": {
      "httpStatusCode": {
        "type": "integer:int32",
        "format": "int32",
        "required": false
      },
      "type": {
        "type": "ExceptionTypeEnum",
        "required": false
      },
      "details": {
        "type": "array<ExceptionDetailModel>",
        "nullable": true,
        "required": false
      },
      "stack": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ExceptionTypeEnum": {
    "type": "string",
    "enum": [
      "InternalSystemError",
      "AuthenticationRequired",
      "AddonMissing",
      "FeatureIsNotEnabled",
      "InvalidParameter",
      "InvalidOperation",
      "InvalidRequest",
      "InsufficientApiScope",
      "InvalidApiVersion",
      "ConfigurationError",
      "UserLicenseType",
      "TermsOfServiceNotApproved",
      "HttpsRequired",
      "OrganizationNotActive",
      "PermissionDenied",
      "TrialExpired",
      "NotAvailableInTrial",
      "InvalidRecaptcha",
      "AddonMissingTermsOfServiceApproval",
      "ExcludedFromTrial"
    ],
    "description": "",
    "properties": {}
  },
  "ExceptionDetailModel": {
    "type": "object",
    "properties": {
      "message": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "url": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "location": {
        "type": "ExceptionLocationModel",
        "nullable": true,
        "required": false
      }
    }
  },
  "ExceptionLocationModel": {
    "type": "object",
    "properties": {
      "type": {
        "type": "ExceptionLocationTypeEnum",
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "identifier": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ExceptionLocationTypeEnum": {
    "type": "string",
    "enum": [
      "PathParameter",
      "RequestBody",
      "RequestHeader",
      "UriParameter"
    ],
    "description": "",
    "properties": {}
  },
  "PatchOperation": {
    "type": "object",
    "required": [
      "op"
    ],
    "properties": {
      "op": {
        "type": "PatchOperationType",
        "required": true
      },
      "path": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "value": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "from": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "PatchOperationType": {
    "type": "string",
    "enum": [
      "Add",
      "Copy",
      "Move",
      "Remove",
      "Replace"
    ],
    "description": "",
    "properties": {}
  },
  "BusinessUnitModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "parentGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "costCenter": {
        "type": "BusinessUnitCostCenterModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "vatNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "kvkNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "fiNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "companyGuid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "companyName": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "companyBusinessUnitGuid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "companyCountryGuid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "companyCurrencyGuid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "BusinessUnitCostCenterModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "identifier": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "CommunicationTypeModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "type": {
        "type": "CommunicationMethodType",
        "required": false
      }
    }
  },
  "CommunicationMethodType": {
    "type": "string",
    "enum": [
      "Phone",
      "Fax",
      "MobilePhone",
      "IPPhone",
      "InstantMessenger",
      "EmailAddress"
    ],
    "description": "",
    "properties": {}
  },
  "KeyValuePairOfStringAndSortDirection": {
    "type": "object",
    "properties": {
      "key": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "value": {
        "type": "SortDirection",
        "required": false
      }
    }
  },
  "SortDirection": {
    "type": "string",
    "enum": [
      "Asc",
      "Desc",
      "AscNullsFirst",
      "AscNullsLast",
      "DescNullsFirst",
      "DescNullsLast"
    ],
    "description": "",
    "properties": {}
  },
  "ContactCommunicationModel": {
    "type": "object",
    "required": [
      "value",
      "contact",
      "communicationType"
    ],
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "value": {
        "type": "string",
        "required": true
      },
      "isForbiddenToUse": {
        "type": "boolean",
        "required": false
      },
      "contact": {
        "type": "ModelBaseWithRequiredGuid",
        "required": true
      },
      "communicationType": {
        "type": "CommunicationTypeSubModel",
        "required": true
      }
    }
  },
  "ModelBaseWithRequiredGuid": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "CommunicationTypeSubModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "type": {
        "type": "CommunicationMethodType",
        "required": false
      }
    }
  },
  "ContactRoleModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "ContactModel": {
    "type": "object",
    "required": [
      "firstName",
      "lastName",
      "customer"
    ],
    "properties": {
      "firstName": {
        "type": "string",
        "required": true
      },
      "lastName": {
        "type": "string",
        "required": true
      },
      "salutation": {
        "type": "SalutationType",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "jobTitle": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "isDeleted": {
        "type": "boolean",
        "readOnly": true,
        "required": false
      },
      "customer": {
        "type": "ContactCustomer",
        "required": true
      },
      "addressGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "phoneNumbers": {
        "type": "array",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "emails": {
        "type": "array",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "satisfactionLevel": {
        "type": "SatisfactionLevelType",
        "nullable": true,
        "required": false
      },
      "timeZone": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "dateOfBirth": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "role": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "language": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "isEmailAllowed": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "SalutationType": {
    "type": "string",
    "enum": [
      "Mr.",
      "Mrs.",
      "Ms."
    ],
    "description": "",
    "properties": {}
  },
  "ContactCustomer": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "SatisfactionLevelType": {
    "type": "string",
    "enum": [
      "Unsatisfied",
      "Neutral",
      "Satisfied",
      "Unknown"
    ],
    "description": "",
    "properties": {}
  },
  "KeyValuePairOfStringAndObject": {
    "type": "object",
    "properties": {
      "key": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "value": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ContactChangedSinceSearchExtensionOptions": {
    "type": "string",
    "enum": [
      "NewOnly",
      "Communications"
    ],
    "description": "",
    "properties": {}
  },
  "CostAccountModel": {
    "type": "object",
    "required": [
      "name",
      "number"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "number": {
        "type": "string",
        "required": true
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "isTravelTypeDefault": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "CostCenterModel": {
    "type": "object",
    "required": [
      "name",
      "identifier"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "identifier": {
        "type": "string",
        "required": true
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "isDefault": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "CountryModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "englishName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "code2": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "code3": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "hasRegions": {
        "type": "CountryRegionsStatus",
        "required": false
      },
      "companyRegisterUrl": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isInEU": {
        "type": "boolean",
        "required": false
      },
      "defaultCulture": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isRegistrationCountry": {
        "type": "boolean",
        "required": false
      },
      "currency": {
        "type": "CurrencyBaseModel",
        "nullable": true,
        "required": false
      },
      "defaultLanguage": {
        "type": "CountryLanguage",
        "nullable": true,
        "required": false
      },
      "timezone": {
        "type": "CountryTimezone",
        "nullable": true,
        "required": false
      }
    }
  },
  "CurrencyBaseModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "symbol": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "CountryLanguage": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "CountryTimezone": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "CountryRegionModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "timezone": {
        "type": "CountryRegionTimezoneModel",
        "nullable": true,
        "required": false
      }
    }
  },
  "CountryRegionTimezoneModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "CustomerMarketSegmentModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "customer": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "marketSegment": {
        "type": "MarketSegmentSubModel",
        "nullable": true,
        "required": false
      },
      "parentMarketSegment": {
        "type": "MarketSegmentSubModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "MarketSegmentSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "FileModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "name": {
        "type": "string",
        "required": true
      },
      "size": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "contentType": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "category": {
        "type": "FileCategory",
        "readOnly": true,
        "required": false
      },
      "isInternal": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "FileCategory": {
    "type": "string",
    "enum": [
      "Misc",
      "Application",
      "Projects",
      "Proposal",
      "ProjectFees",
      "Invoice",
      "Users",
      "ProjectTravelExpense",
      "Customer"
    ],
    "description": "",
    "properties": {}
  },
  "ProjectFileModel": {
    "type": "object",
    "required": [
      "name",
      "projectGuid"
    ],
    "properties": {
      "name": {
        "type": "string",
        "required": true
      },
      "size": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "contentType": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "category": {
        "type": "FileCategory",
        "readOnly": true,
        "required": false
      },
      "isInternal": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "fileGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "usages": {
        "type": "array<UsageModel>",
        "nullable": true,
        "required": false
      },
      "isReadOnly": {
        "type": "boolean",
        "required": false
      },
      "projectGuid": {
        "type": "string",
        "readOnly": true,
        "required": true
      }
    }
  },
  "UsageModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "type": {
        "type": "ReferenceType",
        "required": false
      },
      "isReadOnly": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "ReferenceType": {
    "type": "string",
    "enum": [
      "Invoice",
      "Proposal",
      "InvoiceTemplate",
      "Other"
    ],
    "description": "",
    "properties": {}
  },
  "InvoiceFileModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "name": {
        "type": "string",
        "required": true
      },
      "size": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "contentType": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "category": {
        "type": "FileCategory",
        "readOnly": true,
        "required": false
      },
      "isInternal": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "fileGuid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "invoiceGuid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectTravelExpenseFileModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "name": {
        "type": "string",
        "required": true
      },
      "size": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "contentType": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "category": {
        "type": "FileCategory",
        "readOnly": true,
        "required": false
      },
      "isInternal": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "fileGuid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "travelExpenseGuid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "source": {
        "type": "TravelReimbursementAttachmentSource",
        "readOnly": true,
        "required": false
      }
    }
  },
  "TravelReimbursementAttachmentSource": {
    "type": "string",
    "enum": [
      "Severa",
      "VismaScanner",
      "Google"
    ],
    "description": "",
    "properties": {}
  },
  "FlextimeModel": {
    "type": "object",
    "properties": {
      "totalFlextimeBalance": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "monthFlextimeBalance": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      }
    }
  },
  "FormattingCultureModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "englishName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "nullable": true,
        "required": false
      }
    }
  },
  "HolidayModel": {
    "type": "object",
    "required": [
      "name",
      "date",
      "countryGuid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "date": {
        "type": "string:date",
        "format": "date",
        "required": true
      },
      "countryGuid": {
        "type": "string",
        "required": true
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "isRecurringYearly": {
        "type": "boolean",
        "required": false
      },
      "recurringEndYear": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "isPublicHoliday": {
        "type": "boolean",
        "readOnly": true,
        "required": false
      }
    }
  },
  "IndustryModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "InvoiceStatusModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "isDefault": {
        "type": "boolean",
        "required": false
      },
      "isReadOnly": {
        "type": "boolean",
        "required": false
      },
      "hasInvoiceNumber": {
        "type": "boolean",
        "required": false
      },
      "isSent": {
        "type": "boolean",
        "required": false
      },
      "isWaitingPayment": {
        "type": "boolean",
        "required": false
      },
      "isPaid": {
        "type": "boolean",
        "required": false
      },
      "isDefaultForCreditNote": {
        "type": "boolean",
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "required": false
      }
    }
  },
  "InvoiceTemplateModel": {
    "type": "object",
    "required": [
      "title"
    ],
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "title": {
        "type": "string",
        "required": true
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "isDefault": {
        "type": "boolean",
        "required": false
      },
      "canDelete": {
        "type": "boolean",
        "readOnly": true,
        "required": false
      }
    }
  },
  "InvoiceType": {
    "type": "string",
    "enum": [
      "Invoice",
      "Reminder"
    ],
    "description": "",
    "properties": {}
  },
  "InvoicePdfGetOptions": {
    "type": "string",
    "enum": [
      "All",
      "InvoiceOnly",
      "AttachmentAndBreakdown"
    ],
    "description": "",
    "properties": {}
  },
  "PermissionProfileModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "isDefault": {
        "type": "boolean",
        "required": false
      },
      "isAccessible": {
        "type": "boolean",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "PriceListModel": {
    "type": "object",
    "required": [
      "name",
      "currency"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "isDefault": {
        "type": "boolean",
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "isCustom": {
        "type": "boolean",
        "readOnly": true,
        "required": false
      },
      "isVolumePricing": {
        "type": "boolean",
        "required": false
      },
      "currency": {
        "type": "PriceListCurrency",
        "required": true
      }
    }
  },
  "PriceListCurrency": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "symbol": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "KeywordModel": {
    "type": "object",
    "required": [
      "keyword",
      "category"
    ],
    "properties": {
      "keyword": {
        "type": "string",
        "required": true
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "category": {
        "type": "KeywordCategory",
        "required": true
      }
    }
  },
  "KeywordCategory": {
    "type": "string",
    "enum": [
      "Project",
      "Contact",
      "User",
      "File"
    ],
    "description": "",
    "properties": {}
  },
  "ProjectKeywordModel": {
    "type": "object",
    "required": [
      "keyword"
    ],
    "properties": {
      "keyword": {
        "type": "string",
        "required": true
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "category": {
        "type": "KeywordCategory",
        "readOnly": true,
        "required": false
      }
    }
  },
  "FileKeywordModel": {
    "type": "object",
    "required": [
      "keyword"
    ],
    "properties": {
      "keyword": {
        "type": "string",
        "required": true
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "category": {
        "type": "KeywordCategory",
        "readOnly": true,
        "required": false
      }
    }
  },
  "UserKeywordModel": {
    "type": "object",
    "required": [
      "keyword"
    ],
    "properties": {
      "keyword": {
        "type": "string",
        "required": true
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "category": {
        "type": "KeywordCategory",
        "readOnly": true,
        "required": false
      },
      "userGuid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "KpiFormulaModelBase": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "unit": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "dataType": {
        "type": "SearchFieldDataType",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "category": {
        "type": "KpiFormulaCategory",
        "readOnly": true,
        "required": false
      }
    }
  },
  "SearchFieldDataType": {
    "type": "string",
    "enum": [
      "String",
      "Boolean",
      "Integer",
      "Percentage",
      "Numeric",
      "Money",
      "Date",
      "DateTime",
      "Time",
      "Object",
      "ObjectCollection",
      "IpAddress"
    ],
    "description": "",
    "properties": {}
  },
  "KpiFormulaCategory": {
    "type": "string",
    "enum": [
      "Unknown",
      "Functions",
      "Project",
      "User",
      "Invoice"
    ],
    "description": "",
    "properties": {}
  },
  "LeadSourceModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "MarketSegmentModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "parentMarketSegment": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      }
    }
  },
  "OrganizationSettingsModel": {
    "type": "object",
    "required": [
      "workWeek"
    ],
    "properties": {
      "quickSearchSetting": {
        "type": "QuickSearchOptions",
        "required": false
      },
      "projectNameDisplaySetting": {
        "type": "ProjectNameDisplayOptions",
        "required": false
      },
      "displayProjectNumber": {
        "type": "boolean",
        "required": false
      },
      "projectNameDisplayFormatSetting": {
        "type": "ProjectNameDisplayFormatOptions",
        "required": false
      },
      "nextProjectNumber": {
        "type": "integer:int64",
        "format": "int64",
        "required": false
      },
      "lastProjectNumber": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "nextCustomerNumber": {
        "type": "integer:int64",
        "format": "int64",
        "required": false
      },
      "lastCustomerNumber": {
        "type": "integer:int64",
        "format": "int64",
        "readOnly": true,
        "required": false
      },
      "nextTravelReimbursementNumber": {
        "type": "integer:int32",
        "format": "int32",
        "required": false
      },
      "lastTravelReimbursementNumber": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "travelReimbursementInstructions": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "isTravelExpenseImmediatelyInvoiceable": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "travelEntryClosingDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "travelExpenseReimbursementStartDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "nextPurchaseOrderNumber": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "lastPurchaseOrderNumber": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "purchaseOrderNumberPrefix": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "currencyRoundingType": {
        "type": "TotalRoundingType",
        "required": false
      },
      "overdueInterest": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "paymentTerm": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "nextInvoiceNumber": {
        "type": "integer:int32",
        "format": "int32",
        "required": false
      },
      "lastInvoiceNumber": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "workWeek": {
        "type": "array<Workweek>",
        "required": true
      },
      "workHourApprovalMode": {
        "type": "WorkHourApprovalMode",
        "nullable": true,
        "required": false
      },
      "workHourEntryFormat": {
        "type": "EntryFormat",
        "required": false
      },
      "worktimeEntryClosingDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "paymentReferenceNumberDisplaySetting": {
        "type": "ReferenceNumberDisplay",
        "required": false
      },
      "uniqueIdentifierForProductsAndWorktypes": {
        "type": "boolean",
        "required": false
      },
      "isAddingNewKeywordsFromProjectAllowed": {
        "type": "boolean",
        "required": false
      },
      "isIdenticalPhaseCodesAllowed": {
        "type": "boolean",
        "required": false
      },
      "isWorkHourDescriptionMandatory": {
        "type": "boolean",
        "required": false
      },
      "setCreditNoteInvoiceNumber": {
        "type": "boolean",
        "required": false
      },
      "isCustomerSearchAllowed": {
        "type": "boolean",
        "required": false
      },
      "flextimeCalculationStartDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "maxFlextimeBalanceLimit": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "minFlextimeBalanceLimit": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "lastFlextimeCalculationEndTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastFlextimeCalculationUser": {
        "type": "UserWithFirstNameLastNameModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "defaultFooterColumn1": {
        "type": "FreeTextModel",
        "nullable": true,
        "required": false
      },
      "defaultFooterColumn2": {
        "type": "FreeTextModel",
        "nullable": true,
        "required": false
      },
      "defaultFooterColumn3": {
        "type": "FreeTextModel",
        "nullable": true,
        "required": false
      },
      "isEnteringHourPlannedInvoiceQuantityAllowed": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "QuickSearchOptions": {
    "type": "string",
    "enum": [
      "ShowOpenProjectsSalesCasesAndCustomers",
      "ShowOpenAndClosedProjectsSalesCasesAndCustomers"
    ],
    "description": "",
    "properties": {}
  },
  "ProjectNameDisplayOptions": {
    "type": "string",
    "enum": [
      "ShowProjectLongName",
      "ShowProjectShortName"
    ],
    "description": "",
    "properties": {}
  },
  "ProjectNameDisplayFormatOptions": {
    "type": "string",
    "enum": [
      "ProjectNamePhaseName",
      "CustomerNameProjectNamePhaseName"
    ],
    "description": "",
    "properties": {}
  },
  "TotalRoundingType": {
    "type": "string",
    "enum": [
      "AwayFromZero",
      "NearestInteger"
    ],
    "description": "",
    "properties": {}
  },
  "Workweek": {
    "type": "string",
    "enum": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "description": "",
    "properties": {}
  },
  "WorkHourApprovalMode": {
    "type": "string",
    "enum": [
      "None",
      "RequiredForInvoicing",
      "InvoicableAlways"
    ],
    "description": "",
    "properties": {}
  },
  "EntryFormat": {
    "type": "string",
    "enum": [
      "StartTimeEndTime",
      "Quantity",
      "StartTimeEndTimeNoOverlapping"
    ],
    "description": "",
    "properties": {}
  },
  "ReferenceNumberDisplay": {
    "type": "string",
    "enum": [
      "ReferenceNumber",
      "Kid"
    ],
    "description": "",
    "properties": {}
  },
  "UserWithFirstNameLastNameModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "firstName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "lastName": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "FreeTextModel": {
    "type": "object",
    "properties": {
      "value": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "text": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "allowTags": {
        "type": "boolean",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "tagContext": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "ProductCategoryModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "isDefault": {
        "type": "boolean",
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectWorkTypeModel": {
    "type": "object",
    "required": [
      "projectGuid",
      "worktype"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectGuid": {
        "type": "string",
        "required": true
      },
      "worktype": {
        "type": "WorkTypeSubModel",
        "required": true
      },
      "isDefault": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "WorkTypeSubModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "readOnly": true,
        "required": false
      },
      "isProductive": {
        "type": "boolean",
        "readOnly": true,
        "required": false
      }
    }
  },
  "SalesAccountModel": {
    "type": "object",
    "required": [
      "name",
      "number"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "number": {
        "type": "string",
        "required": true
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "isProductDefault": {
        "type": "boolean",
        "required": false
      },
      "isWorkTypeDefault": {
        "type": "boolean",
        "required": false
      },
      "isTravelTypeDefault": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "ActivityParticipantModel": {
    "type": "object",
    "required": [
      "participantGuid",
      "activityGuid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "type": {
        "type": "ParticipantType",
        "required": false
      },
      "participantGuid": {
        "type": "string",
        "required": true
      },
      "activityGuid": {
        "type": "string",
        "required": true
      },
      "email": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "phone": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "mobilePhone": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "status": {
        "type": "MemberStatus",
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "readOnly": true,
        "required": false
      }
    }
  },
  "ParticipantType": {
    "type": "string",
    "enum": [
      "User",
      "Contact",
      "Resource",
      "Other"
    ],
    "description": "",
    "properties": {}
  },
  "MemberStatus": {
    "type": "string",
    "enum": [
      "Unknown",
      "Invited",
      "Accepted",
      "Tentative",
      "Declined"
    ],
    "description": "",
    "properties": {}
  },
  "GuidConversionModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "converted": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "CustomerCountrySettingsOutputModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "customer": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      },
      "country": {
        "type": "CustomerCountry",
        "nullable": true,
        "required": false
      },
      "valueAddedTax": {
        "type": "ValueAddedTaxSubModel",
        "nullable": true,
        "required": false
      },
      "isTaxFree": {
        "type": "boolean",
        "required": false
      },
      "taxFreeDescription": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "zeroVatCategoryCodeEn16931": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ModelBase": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "CustomerCountry": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "englishName": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ValueAddedTaxSubModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "percentage": {
        "type": "number:double",
        "format": "double",
        "readOnly": true,
        "required": false
      }
    }
  },
  "CustomerCountrySettingsInputModel": {
    "type": "object",
    "required": [
      "customer",
      "country"
    ],
    "properties": {
      "customer": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "country": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "valueAddedTax": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "isTaxFree": {
        "type": "boolean",
        "required": false
      },
      "taxFreeDescription": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "zeroVatCategoryCodeEn16931": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "SimpleInputRequiredModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      }
    }
  },
  "SimpleInputModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "CustomerCustomPropertySelectionItemOutputModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "customerCustomProperty": {
        "type": "CustomPropertyShortModel",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      }
    }
  },
  "CustomPropertyShortModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "type": {
        "type": "CustomPropertyType",
        "readOnly": true,
        "required": false
      },
      "parameters": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "CustomPropertyType": {
    "type": "string",
    "enum": [
      "Numeric",
      "Money",
      "String",
      "Date",
      "Selection"
    ],
    "description": "",
    "properties": {}
  },
  "CustomerCustomPropertySelectionItemInputModel": {
    "type": "object",
    "required": [
      "customerCustomProperty"
    ],
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "customerCustomProperty": {
        "type": "SimpleInputModel",
        "required": true
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      }
    }
  },
  "FlatRateOutputModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "project": {
        "type": "FlatrateProjectSubModel",
        "nullable": true,
        "required": false
      },
      "phase": {
        "type": "ModelBaseWithRequiredGuid",
        "nullable": true,
        "required": false
      },
      "billingSchedule": {
        "type": "BillingScheduleType",
        "nullable": true,
        "required": false
      },
      "plannedBillingDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "price": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "includesHours": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "billAdditionalHours": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "pricePerAdditionalHour": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "invoiceGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "FlatrateProjectSubModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "BillingScheduleType": {
    "type": "string",
    "enum": [
      "Immediately",
      "WhenPhaseCompleted",
      "OnDate"
    ],
    "description": "",
    "properties": {}
  },
  "MoneyOutputModel": {
    "type": "object",
    "properties": {
      "amount": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "currencyCode": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "multiCurrencyInfo": {
        "type": "array<MultiCurrencyInfoModel>",
        "nullable": true,
        "required": false
      }
    }
  },
  "MultiCurrencyInfoModel": {
    "type": "object",
    "properties": {
      "amount": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "currencyCode": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "purpose": {
        "type": "array<CurrencyPurpose>",
        "nullable": false,
        "required": false
      }
    }
  },
  "CurrencyPurpose": {
    "type": "string",
    "enum": [
      "ProjectPrice",
      "ProjectCost",
      "UserCost",
      "ExpenseCost"
    ],
    "description": "",
    "properties": {}
  },
  "FlextimeAdjustmentOutputModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "user": {
        "type": "UserWithFirstNameLastNamePhotoFileModelAndRequiredGuid",
        "nullable": true,
        "required": false
      },
      "adjustmentDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "amount": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "notes": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "UserWithFirstNameLastNamePhotoFileModelAndRequiredGuid": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "code": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "firstName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "lastName": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "FlextimeAdjustmentInputModel": {
    "type": "object",
    "required": [
      "user",
      "adjustmentDate",
      "amount"
    ],
    "properties": {
      "user": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "adjustmentDate": {
        "type": "string:date",
        "format": "date",
        "required": true
      },
      "amount": {
        "type": "number:double",
        "format": "double",
        "required": true
      },
      "notes": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ContactKeywordModel": {
    "type": "object",
    "required": [
      "keyword"
    ],
    "properties": {
      "keyword": {
        "type": "string",
        "required": true
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "category": {
        "type": "KeywordCategory",
        "readOnly": true,
        "required": false
      }
    }
  },
  "ProjectCustomPropertySelectionItemOutputModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "projectCustomProperty": {
        "type": "CustomPropertyShortModel",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectCustomPropertySelectionItemInputModel": {
    "type": "object",
    "required": [
      "projectCustomProperty"
    ],
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectCustomProperty": {
        "type": "SimpleInputModel",
        "required": true
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      }
    }
  },
  "CustomerCustomValueOutputModel": {
    "type": "object",
    "properties": {
      "customProperty": {
        "type": "CustomPropertyShortModel",
        "nullable": true,
        "required": false
      },
      "value": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "customer": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectInvoiceSettingsOutputModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "project": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      },
      "freeText1": {
        "type": "TemplateFreeTextModel",
        "nullable": true,
        "required": false
      },
      "htmlText1": {
        "type": "TemplateFreeTextModel",
        "nullable": true,
        "required": false
      },
      "freeText2": {
        "type": "TemplateFreeTextModel",
        "nullable": true,
        "required": false
      },
      "htmlText2": {
        "type": "TemplateFreeTextModel",
        "nullable": true,
        "required": false
      },
      "showQuantity": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "showUnit": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "showUnitPrice": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "showValueAddedTax": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "showPriceExcludingValueAddedTax": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "showAttachmentUnit": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "showAttachmentUnitPrice": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "showAttachmentValueAddedTax": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "showAttachmentPriceExcludingValueAddedTax": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "workHourDescriptionFormat": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectTravelExpenseDescriptionFormat": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectFeeDescriptionFormat": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "workHourGrouping": {
        "type": "InvoiceGrouping",
        "nullable": true,
        "required": false
      },
      "projectFeeGrouping": {
        "type": "InvoiceGrouping",
        "nullable": true,
        "required": false
      },
      "projectTravelExpenseGrouping": {
        "type": "InvoiceGrouping",
        "nullable": true,
        "required": false
      },
      "workHourPrimaryGroupBy": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "workHourSecondaryGroupBy": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectFeePrimaryGroupBy": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectFeeSecondaryGroupBy": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectTravelExpensePrimaryGroupBy": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectTravelExpenseSecondaryGroupBy": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "showCategories": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "showReferenceNumber": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "showLogoAndTitle": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "showFooter": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "style": {
        "type": "InvoiceSkin",
        "nullable": true,
        "required": false
      }
    }
  },
  "TemplateFreeTextModel": {
    "type": "object",
    "properties": {
      "value": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "allowTags": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "tagContext": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "InvoiceGrouping": {
    "type": "string",
    "enum": [
      "OneByOne",
      "Group",
      "Group+Attachment"
    ],
    "description": "",
    "properties": {}
  },
  "InvoiceSkin": {
    "type": "string",
    "enum": [
      "BlackAndWhite",
      "Blue",
      "Cyan",
      "Green",
      "Lilac",
      "Orange",
      "Plain",
      "Red",
      "Yellow"
    ],
    "description": "",
    "properties": {}
  },
  "ProjectInvoiceSettingsInputModel": {
    "type": "object",
    "required": [
      "project"
    ],
    "properties": {
      "project": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "freeText1": {
        "type": "TemplateFreeTextModel",
        "nullable": true,
        "required": false
      },
      "htmlText1": {
        "type": "TemplateFreeTextModel",
        "nullable": true,
        "required": false
      },
      "freeText2": {
        "type": "TemplateFreeTextModel",
        "nullable": true,
        "required": false
      },
      "htmlText2": {
        "type": "TemplateFreeTextModel",
        "nullable": true,
        "required": false
      },
      "showQuantity": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "showUnit": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "showUnitPrice": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "showValueAddedTax": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "showPriceExcludingValueAddedTax": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "showAttachmentUnit": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "showAttachmentUnitPrice": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "showAttachmentValueAddedTax": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "showAttachmentPriceExcludingValueAddedTax": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "workHourDescriptionFormat": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectTravelExpenseDescriptionFormat": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectFeeDescriptionFormat": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "workHourGrouping": {
        "type": "InvoiceGrouping",
        "nullable": true,
        "required": false
      },
      "projectFeeGrouping": {
        "type": "InvoiceGrouping",
        "nullable": true,
        "required": false
      },
      "projectTravelExpenseGrouping": {
        "type": "InvoiceGrouping",
        "nullable": true,
        "required": false
      },
      "workHourPrimaryGroupBy": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "workHourSecondaryGroupBy": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectFeePrimaryGroupBy": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectFeeSecondaryGroupBy": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectTravelExpensePrimaryGroupBy": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectTravelExpenseSecondaryGroupBy": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "showCategories": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "showReferenceNumber": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "showLogoAndTitle": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "showFooter": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "style": {
        "type": "InvoiceSkin",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectProductOutputModel": {
    "type": "object",
    "required": [
      "product"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "project": {
        "type": "ProjectSubModel",
        "nullable": true,
        "required": false
      },
      "product": {
        "type": "ProjectProductSubModel",
        "required": true
      }
    }
  },
  "ProjectSubModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectProductSubModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "productCategory": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "productCode": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "productType": {
        "type": "TypeOfProduct",
        "readOnly": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "readOnly": true,
        "required": false
      }
    }
  },
  "TypeOfProduct": {
    "type": "string",
    "enum": [
      "OwnWork",
      "Products",
      "Subcontracting",
      "Travels"
    ],
    "description": "",
    "properties": {}
  },
  "ProjectProductInputModel": {
    "type": "object",
    "required": [
      "project",
      "product"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "project": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "product": {
        "type": "SimpleInputRequiredModel",
        "required": true
      }
    }
  },
  "ProjectWorkHourPriceOutputModel": {
    "type": "object",
    "properties": {
      "phase": {
        "type": "ModelBaseWithRequiredGuid",
        "nullable": true,
        "required": false
      },
      "isAvailable": {
        "type": "boolean",
        "required": false
      },
      "isBillable": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "user": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "workType": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "unitPrice": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "project": {
        "type": "ProjectSubModel",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectWorkHourPriceInputModel": {
    "type": "object",
    "required": [
      "unitPrice",
      "project"
    ],
    "properties": {
      "phase": {
        "type": "SimpleInputRequiredModel",
        "nullable": true,
        "required": false
      },
      "isBillable": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "user": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "workType": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "unitPrice": {
        "type": "MoneyInputModel",
        "required": true
      },
      "project": {
        "type": "SimpleInputModel",
        "required": true
      }
    }
  },
  "MoneyInputModel": {
    "type": "object",
    "required": [
      "amount",
      "currencyCode"
    ],
    "properties": {
      "amount": {
        "type": "number:double",
        "format": "double",
        "required": true
      },
      "currencyCode": {
        "type": "string",
        "required": true
      }
    }
  },
  "ProposalSubtotalOutputModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "proposal": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      },
      "phase": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      },
      "projectFee": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "isShownOnProposal": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "ProposalSubtotalInputModel": {
    "type": "object",
    "required": [
      "name",
      "proposal"
    ],
    "properties": {
      "name": {
        "type": "string",
        "required": true
      },
      "proposal": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "phase": {
        "type": "ModelBase",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "isShownOnProposal": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "ProposalFeeRowOutputModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "product": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      },
      "projectFee": {
        "type": "ModelBase",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "proposal": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      },
      "subtotal": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "quantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "measurementUnit": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "unitPrice": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "unitCost": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "isShownOnProposal": {
        "type": "boolean",
        "required": false
      },
      "vatRate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProposalFeeRowInputModel": {
    "type": "object",
    "required": [
      "name",
      "proposal",
      "quantity"
    ],
    "properties": {
      "name": {
        "type": "string",
        "required": true
      },
      "product": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "projectFee": {
        "type": "SimpleInputModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "proposal": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "subtotal": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "quantity": {
        "type": "number:double",
        "format": "double",
        "required": true
      },
      "measurementUnit": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "unitPrice": {
        "type": "MoneyInputModel",
        "nullable": true,
        "required": false
      },
      "unitCost": {
        "type": "MoneyInputModel",
        "nullable": true,
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "isShownOnProposal": {
        "type": "boolean",
        "required": false
      },
      "vatRate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProposalStatusOutputModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "required": false
      },
      "isWon": {
        "type": "boolean",
        "required": false
      },
      "isLost": {
        "type": "boolean",
        "required": false
      },
      "isDefault": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "UsageModel2": {
    "type": "object",
    "properties": {
      "context": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "count": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "ProposalStatusInputModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "name": {
        "type": "string",
        "required": true
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "required": false
      },
      "isWon": {
        "type": "boolean",
        "required": false
      },
      "isLost": {
        "type": "boolean",
        "required": false
      },
      "isDefault": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "ProposalOutputModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "proposalDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "language": {
        "type": "ProposalLanguageSubModel",
        "nullable": true,
        "required": false
      },
      "culture": {
        "type": "FormattingCultureSubModel",
        "nullable": true,
        "required": false
      },
      "customer": {
        "type": "ProposalCustomerSubModel",
        "nullable": true,
        "required": false
      },
      "customerContactPerson": {
        "type": "CustomerContactPersonSubModel",
        "nullable": true,
        "required": false
      },
      "project": {
        "type": "ProposalProjectSubModel",
        "nullable": true,
        "required": false
      },
      "proposalStatus": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "billingAddress": {
        "type": "ProposalBillingAddressSubModel",
        "nullable": true,
        "required": false
      },
      "totalIncludingVat": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "totalExcludingVat": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "freeText1": {
        "type": "FreeTextModel2",
        "nullable": true,
        "required": false
      },
      "freeText2": {
        "type": "FreeTextModel2",
        "nullable": true,
        "required": false
      },
      "pricelist": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProposalLanguageSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "englishName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "FormattingCultureSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "englishName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProposalCustomerSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "required": false
      }
    }
  },
  "CustomerContactPersonSubModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProposalProjectSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProposalBillingAddressSubModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "addressline": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "postalCode": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "city": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "country": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "FreeTextModel2": {
    "type": "object",
    "properties": {
      "value": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "text": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "plainText": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "allowTags": {
        "type": "boolean",
        "readOnly": true,
        "required": false
      },
      "tagContext": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "ProposalInputModel": {
    "type": "object",
    "required": [
      "name",
      "project"
    ],
    "properties": {
      "name": {
        "type": "string",
        "required": true
      },
      "proposalDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "language": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "culture": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "customerContactPerson": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "project": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "proposalStatus": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "billingAddress": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "freeText1": {
        "type": "FreeTextInputModel",
        "nullable": true,
        "required": false
      },
      "freeText2": {
        "type": "FreeTextInputModel",
        "nullable": true,
        "required": false
      }
    }
  },
  "FreeTextInputModel": {
    "type": "object",
    "properties": {
      "value": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProposalSettingsOutputModel": {
    "type": "object",
    "properties": {
      "isTaxFree": {
        "type": "boolean",
        "required": false
      },
      "showQuantity": {
        "type": "boolean",
        "required": false
      },
      "showUnit": {
        "type": "boolean",
        "required": false
      },
      "showUnitPrice": {
        "type": "boolean",
        "required": false
      },
      "showTotalPrice": {
        "type": "boolean",
        "required": false
      },
      "showBillingDetails": {
        "type": "boolean",
        "required": false
      },
      "showProjectMembers": {
        "type": "boolean",
        "required": false
      },
      "showGanttChart": {
        "type": "boolean",
        "required": false
      },
      "showTreeview": {
        "type": "boolean",
        "required": false
      },
      "showProjectPlan": {
        "type": "boolean",
        "required": false
      },
      "showOurReference": {
        "type": "boolean",
        "required": false
      },
      "showYourReference": {
        "type": "boolean",
        "required": false
      },
      "showOrderNumber": {
        "type": "boolean",
        "required": false
      },
      "showBillingContact": {
        "type": "boolean",
        "required": false
      },
      "showPaymentTerms": {
        "type": "boolean",
        "required": false
      },
      "style": {
        "type": "InvoiceSkin",
        "nullable": true,
        "required": false
      },
      "printTotalInPdf": {
        "type": "PrintToPdf",
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "PrintToPdf": {
    "type": "string",
    "enum": [
      "DoNotPrintToProposal",
      "PrintToProposalBottom",
      "PrintToProposalBoth"
    ],
    "description": "",
    "properties": {}
  },
  "ProposalWorkhourRowOutputModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "workType": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      },
      "phase": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      },
      "proposal": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      },
      "subtotal": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      },
      "projectFee": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "quantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "unitPrice": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "unitCost": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "isShownOnProposal": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "ProposalWorkhourRowInputModel": {
    "type": "object",
    "required": [
      "name",
      "quantity",
      "workType",
      "proposal"
    ],
    "properties": {
      "name": {
        "type": "string",
        "required": true
      },
      "quantity": {
        "type": "number:double",
        "format": "double",
        "required": true
      },
      "workType": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "proposal": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "phase": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "subtotal": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "isShownOnProposal": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "RoleAllocationOutputModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "role": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "allocationHours": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "startDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "endDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "customer": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "project": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "phase": {
        "type": "PhaseSubModel",
        "nullable": true,
        "required": false
      }
    }
  },
  "PhaseSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "startDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "endDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      }
    }
  },
  "RoleAllocationInputModel": {
    "type": "object",
    "required": [
      "role",
      "allocationHours",
      "project"
    ],
    "properties": {
      "role": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "allocationHours": {
        "type": "number:double",
        "format": "double",
        "required": true
      },
      "project": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "phase": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "startDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "endDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      }
    }
  },
  "RoleOutputModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "RoleInputModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "ProjectSalesNoteOutputModel": {
    "type": "object",
    "properties": {
      "note": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isDeleted": {
        "type": "boolean",
        "required": false
      },
      "user": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "ModelBase",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "ModelBase",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "project": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      }
    }
  },
  "CustomerSalesNoteOutputModel": {
    "type": "object",
    "properties": {
      "note": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isDeleted": {
        "type": "boolean",
        "required": false
      },
      "user": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "ModelBase",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "ModelBase",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "customer": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      }
    }
  },
  "SalesNoteOutputModel": {
    "type": "object",
    "properties": {
      "note": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isDeleted": {
        "type": "boolean",
        "required": false
      },
      "user": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "ModelBase",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "ModelBase",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "project": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      },
      "customer": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectSalesNoteInputModel": {
    "type": "object",
    "required": [
      "user",
      "project"
    ],
    "properties": {
      "user": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "note": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "project": {
        "type": "SimpleInputRequiredModel",
        "required": true
      }
    }
  },
  "CustomerSalesNoteInputModel": {
    "type": "object",
    "required": [
      "user",
      "customer"
    ],
    "properties": {
      "user": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "note": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "customer": {
        "type": "SimpleInputRequiredModel",
        "required": true
      }
    }
  },
  "UserCustomPropertyOutputModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "permission": {
        "type": "PermissionLevel",
        "required": false
      },
      "type": {
        "type": "CustomPropertyType",
        "required": false
      },
      "parameters": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "usageCount": {
        "type": "integer:int32",
        "format": "int32",
        "required": false
      }
    }
  },
  "PermissionLevel": {
    "type": "string",
    "enum": [
      "View",
      "Edit"
    ],
    "description": "",
    "properties": {}
  },
  "UserCustomPropertyInputModel": {
    "type": "object",
    "required": [
      "name",
      "type"
    ],
    "properties": {
      "name": {
        "type": "string",
        "required": true
      },
      "type": {
        "type": "CustomPropertyType",
        "required": true
      },
      "permission": {
        "type": "PermissionLevel",
        "required": false
      },
      "parameters": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "ProjectCustomValueOutputModel": {
    "type": "object",
    "properties": {
      "customProperty": {
        "type": "CustomPropertyShortModel",
        "nullable": true,
        "required": false
      },
      "value": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "project": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      }
    }
  },
  "UserCustomValueOutputModel": {
    "type": "object",
    "properties": {
      "customProperty": {
        "type": "CustomPropertyShortModel",
        "nullable": true,
        "required": false
      },
      "value": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "user": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      }
    }
  },
  "UserCustomValueInputModel": {
    "type": "object",
    "required": [
      "customProperty",
      "user"
    ],
    "properties": {
      "customProperty": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "value": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "user": {
        "type": "SimpleInputRequiredModel",
        "required": true
      }
    }
  },
  "UserCustomPropertySelectionItemOutputModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "userCustomProperty": {
        "type": "CustomPropertyShortModel",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      }
    }
  },
  "UserCustomPropertySelectionItemInputModel": {
    "type": "object",
    "required": [
      "userCustomProperty"
    ],
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "userCustomProperty": {
        "type": "SimpleInputModel",
        "required": true
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      }
    }
  },
  "WorkContractOutputModel": {
    "type": "object",
    "required": [
      "title",
      "startDate"
    ],
    "properties": {
      "title": {
        "type": "string",
        "required": true
      },
      "startDate": {
        "type": "string:date",
        "format": "date",
        "required": true
      },
      "endDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "dailyHours": {
        "type": "number:double",
        "format": "double",
        "required": false
      },
      "isOvertimeAllowed": {
        "type": "boolean",
        "required": false
      },
      "isFlextimeActive": {
        "type": "boolean",
        "required": false
      },
      "flextimeLimitPerDay": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "workWeek": {
        "type": "array<Workweek>",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "hourCost": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "user": {
        "type": "UserWithPhotoFileModelAndRequiredGuid",
        "nullable": true,
        "required": false
      },
      "role": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "UserWithPhotoFileModelAndRequiredGuid": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "WorkContractInputModel": {
    "type": "object",
    "required": [
      "title",
      "startDate",
      "hourCost",
      "user"
    ],
    "properties": {
      "title": {
        "type": "string",
        "required": true
      },
      "startDate": {
        "type": "string:date",
        "format": "date",
        "required": true
      },
      "endDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "dailyHours": {
        "type": "number:double",
        "format": "double",
        "required": false
      },
      "isOvertimeAllowed": {
        "type": "boolean",
        "required": false
      },
      "isFlextimeActive": {
        "type": "boolean",
        "required": false
      },
      "flextimeLimitPerDay": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "hourCost": {
        "type": "MoneyInputModelWithNotNegativeAmount",
        "required": true
      },
      "user": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "workWeek": {
        "type": "array<Workweek>",
        "nullable": true,
        "required": false
      },
      "role": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      }
    }
  },
  "MoneyInputModelWithNotNegativeAmount": {
    "type": "object",
    "required": [
      "currencyCode"
    ],
    "properties": {
      "amount": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "currencyCode": {
        "type": "string",
        "required": true
      }
    }
  },
  "WorkHourPriceOutputModel": {
    "type": "object",
    "properties": {
      "isBillable": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "user": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "workType": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "unitPrice": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "pricelistVersion": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      }
    }
  },
  "CustomPropertyModel": {
    "type": "object",
    "required": [
      "name",
      "type"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "type": {
        "type": "CustomPropertyType",
        "required": true
      },
      "parameters": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "usageCount": {
        "type": "integer:int32",
        "format": "int32",
        "readOnly": true,
        "required": false
      }
    }
  },
  "CustomerCustomValueModel": {
    "type": "object",
    "required": [
      "customProperty"
    ],
    "properties": {
      "customProperty": {
        "type": "CustomPropertyShortModel",
        "required": true
      },
      "value": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "customerGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectCustomValueModel": {
    "type": "object",
    "required": [
      "customProperty"
    ],
    "properties": {
      "customProperty": {
        "type": "CustomPropertyShortModel",
        "required": true
      },
      "value": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "projectGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ActivityTypeModel": {
    "type": "object",
    "required": [
      "category",
      "name"
    ],
    "properties": {
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "isDefault": {
        "type": "boolean",
        "required": false
      },
      "isPaidLeave": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "category": {
        "type": "ActivityCategory",
        "required": true
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "ActivityCategory": {
    "type": "string",
    "enum": [
      "Personal",
      "Absences",
      "CalendarEntry",
      "SalesEvent",
      "Task"
    ],
    "description": "",
    "properties": {}
  },
  "EInvoicingAddressOutputModel": {
    "type": "object",
    "required": [
      "customer",
      "eInvoiceAddress"
    ],
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "customer": {
        "type": "ModelBaseWithRequiredGuid",
        "required": true
      },
      "eInvoiceAddress": {
        "type": "string",
        "required": true
      },
      "eInvoiceOperatorCode": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "organizationUnitNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "InvoiceOutputModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "number": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "referenceNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "status": {
        "type": "InvoiceStatusSubModel",
        "nullable": true,
        "required": false
      },
      "customer": {
        "type": "InvoiceCustomerSubModel",
        "nullable": true,
        "required": false
      },
      "projects": {
        "type": "array<InvoiceProjectSubModel>",
        "nullable": true,
        "required": false
      },
      "date": {
        "type": "string:date",
        "format": "date",
        "required": false
      },
      "dueDate": {
        "type": "string:date",
        "format": "date",
        "required": false
      },
      "paymentDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "entryDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "paymentTerm": {
        "type": "integer:int32",
        "format": "int32",
        "required": false
      },
      "overdueInterest": {
        "type": "number:double",
        "format": "double",
        "required": false
      },
      "ourReference": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "yourReference": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "currency": {
        "type": "CurrencySubModel",
        "nullable": true,
        "required": false
      },
      "currencyRate": {
        "type": "number:double",
        "format": "double",
        "required": false
      },
      "totalIncludingTax": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "totalExcludingTax": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "totalTax": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "workHoursTotalExcludingTax": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "projectFeesTotalExcludingTax": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "projectTravelExpensesTotalExcludingTax": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "flatRatesTotalExcludingTax": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "workHoursQuantity": {
        "type": "number:double",
        "format": "double",
        "required": false
      },
      "receiverCustomerName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "receiverContactGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "receiverContactName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "receiverContactEmail": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "receiverAddress": {
        "type": "InvoiceReceiverAddressSubModel",
        "nullable": true,
        "required": false
      },
      "receiverVatNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "receiverKvkNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "senderName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "senderContactName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "senderContactGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "senderAddress": {
        "type": "InvoiceSenderAddressSubModel",
        "nullable": true,
        "required": false
      },
      "senderVatNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "senderKvkNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isCreditNote": {
        "type": "boolean",
        "required": false
      },
      "reimburseInvoice": {
        "type": "RelatedInvoiceSubModel",
        "nullable": true,
        "required": false
      },
      "creditNoteInvoice": {
        "type": "RelatedInvoiceSubModel",
        "nullable": true,
        "required": false
      },
      "invoiceNumberBusinessUnitGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "orderNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "invoiceTemplate": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "culture": {
        "type": "FormattingCultureSubModel2",
        "nullable": true,
        "required": false
      },
      "billingCustomer": {
        "type": "InvoiceCustomerSubModel",
        "nullable": true,
        "required": false
      },
      "notes": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "freeText1": {
        "type": "FreeTextModel2",
        "nullable": true,
        "required": false
      },
      "freeText2": {
        "type": "FreeTextModel2",
        "nullable": true,
        "required": false
      },
      "language": {
        "type": "InvoiceLanguageSubModel",
        "nullable": true,
        "required": false
      },
      "canBeDeleted": {
        "type": "boolean",
        "required": false
      },
      "workHourValueAddedTax": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      }
    }
  },
  "InvoiceStatusSubModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "isSent": {
        "type": "boolean",
        "required": false
      },
      "isWaitingPayment": {
        "type": "boolean",
        "required": false
      },
      "isPaid": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "InvoiceCustomerSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "required": false
      },
      "isPrivatePerson": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "InvoiceProjectSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "required": false
      }
    }
  },
  "CurrencySubModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "symbol": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "InvoiceReceiverAddressSubModel": {
    "type": "object",
    "properties": {
      "addressline": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "postalCode": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "city": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "state": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "country": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "InvoiceSenderAddressSubModel": {
    "type": "object",
    "properties": {
      "addressline": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "postalCode": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "city": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "state": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "country": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "RelatedInvoiceSubModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      }
    }
  },
  "FormattingCultureSubModel2": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "englishName": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "InvoiceLanguageSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "englishName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "CreateInvoiceModel": {
    "type": "object",
    "required": [
      "projects"
    ],
    "properties": {
      "projects": {
        "type": "array<CreateInvoiceProjectModel>",
        "required": true
      },
      "groupProjects": {
        "type": "boolean",
        "required": false
      },
      "invoiceStatusGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "billingCustomerGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "date": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      }
    }
  },
  "CreateInvoiceProjectModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      }
    }
  },
  "CustomerModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "isInternal": {
        "type": "boolean",
        "readOnly": true,
        "required": false
      },
      "notes": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "email": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "website": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "vatNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "kvkNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "fiNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "numberOfEmployees": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "annualRevenue": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "required": false
      },
      "language": {
        "type": "CustomerLanguage",
        "nullable": true,
        "required": false
      },
      "currency": {
        "type": "CustomerCurrency",
        "nullable": true,
        "required": false
      },
      "owner": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "required": false
      },
      "industry": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "headquarterAddress": {
        "type": "CustomerHeadquarterAddress",
        "nullable": true,
        "required": false
      },
      "timezone": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "pricelist": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "paymentTerm": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "overdueInterest": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "invoicingVat": {
        "type": "CustomerInvoicingVat",
        "nullable": true,
        "required": false
      },
      "eInvoiceAddress": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "eInvoiceOperator": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "organizationUnitNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "invoiceTemplate": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "isPrivatePerson": {
        "type": "boolean",
        "required": false
      },
      "eInvoicingInfo": {
        "type": "CustomerEInvoicingModel",
        "nullable": true,
        "required": false
      }
    }
  },
  "CustomerLanguage": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "englishName": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "CustomerCurrency": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "symbol": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "CustomerHeadquarterAddress": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "addressline": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "postalCode": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "city": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "country": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "CustomerInvoicingVat": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "percentage": {
        "type": "number:double",
        "format": "double",
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "CustomerEInvoicingModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "eInvoiceAddress": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "eInvoiceOperatorCode": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "organizationUnitNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "CustomerChangedSinceSearchExtensionOptions": {
    "type": "string",
    "enum": [
      "NewOnly",
      "MarketSegments",
      "Addresses",
      "Contacts",
      "EInvoicingInfo"
    ],
    "description": "",
    "properties": {}
  },
  "CustomerFileModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "name": {
        "type": "string",
        "required": true
      },
      "size": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "contentType": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "category": {
        "type": "FileCategory",
        "readOnly": true,
        "required": false
      },
      "isInternal": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "fileGuid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "customer": {
        "type": "ModelWithName",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "InvoiceSettingsOutputModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "entryDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "paymentDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "isReverseCharged": {
        "type": "boolean",
        "required": false
      },
      "reverseChargeDescription": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "style": {
        "type": "InvoiceSkin",
        "nullable": true,
        "required": false
      },
      "showLogoAndTitle": {
        "type": "boolean",
        "required": false
      },
      "showFooter": {
        "type": "boolean",
        "required": false
      },
      "showQuantity": {
        "type": "boolean",
        "required": false
      },
      "showUnit": {
        "type": "boolean",
        "required": false
      },
      "showUnitPrice": {
        "type": "boolean",
        "required": false
      },
      "showValueAddedTax": {
        "type": "boolean",
        "required": false
      },
      "showPriceExcludingValueAddedTax": {
        "type": "boolean",
        "readOnly": true,
        "required": false
      },
      "showAttachmentQuantity": {
        "type": "boolean",
        "readOnly": true,
        "required": false
      },
      "showAttachmentUnit": {
        "type": "boolean",
        "required": false
      },
      "showAttachmentUnitPrice": {
        "type": "boolean",
        "required": false
      },
      "showAttachmentValueAddedTax": {
        "type": "boolean",
        "required": false
      },
      "showAttachmentPriceExcludingValueAddedTax": {
        "type": "boolean",
        "required": false
      },
      "workHourDescriptionFormat": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectTravelExpenseDescriptionFormat": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectFeeDescriptionFormat": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "workHourGrouping": {
        "type": "InvoiceGrouping",
        "required": false
      },
      "projectFeeGrouping": {
        "type": "InvoiceGrouping",
        "required": false
      },
      "projectTravelExpenseGrouping": {
        "type": "InvoiceGrouping",
        "required": false
      },
      "workHourPrimaryGroupBy": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "workHourSecondaryGroupBy": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectFeePrimaryGroupBy": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectFeeSecondaryGroupBy": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectTravelExpensePrimaryGroupBy": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectTravelExpenseSecondaryGroupBy": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "showCategories": {
        "type": "boolean",
        "required": false
      },
      "categorySortOrder": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "showReferenceNumber": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "InvoiceRowOutputModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "invoiceGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "rowType": {
        "type": "InvoiceRowType",
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "quantity": {
        "type": "number:double",
        "format": "double",
        "required": false
      },
      "unitPrice": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "measurementUnit": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "vatRate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "required": false
      },
      "salesAccount": {
        "type": "InvoiceRowAccountingSubModel",
        "nullable": true,
        "required": false
      },
      "recurringSalesAccount": {
        "type": "InvoiceRowAccountingSubModel",
        "nullable": true,
        "required": false
      },
      "costCenter": {
        "type": "InvoiceRowAccountingSubModel",
        "nullable": true,
        "required": false
      },
      "vatAccount": {
        "type": "InvoiceRowAccountingSubModel",
        "nullable": true,
        "required": false
      },
      "salesReceivableAccount": {
        "type": "InvoiceRowAccountingSubModel",
        "nullable": true,
        "required": false
      },
      "category": {
        "type": "InvoiceRowCategory",
        "required": false
      },
      "flatRateGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "hasInvoiceComment": {
        "type": "boolean",
        "required": false
      },
      "code": {
        "type": "array",
        "nullable": true,
        "required": false
      }
    }
  },
  "InvoiceRowType": {
    "type": "string",
    "enum": [
      "FlatRate",
      "Hours",
      "ProjectFees",
      "TravelExpenses"
    ],
    "description": "",
    "properties": {}
  },
  "InvoiceRowAccountingSubModel": {
    "type": "object",
    "properties": {
      "number": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "InvoiceRowCategory": {
    "type": "string",
    "enum": [
      "Hours",
      "ProjectFees",
      "Travels"
    ],
    "description": "",
    "properties": {}
  },
  "LanguageModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "englishName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isInvoiceLanguage": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "OrganizationDetailsOutputModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "vatNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "kvkNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "fiNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isVatRegistered": {
        "type": "boolean",
        "required": false
      },
      "registeredOffice": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "address": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "postalCode": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "city": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "country": {
        "type": "OrganizationDetailsCountrySubModel",
        "nullable": true,
        "required": false
      },
      "phone": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "fax": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "termsOfServiceApprover": {
        "type": "UserWithNameAndPhotoFileModel",
        "nullable": true,
        "required": false
      },
      "eInvoiceAddress": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "eInvoiceOperatorCode": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "odpCompany": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "currency": {
        "type": "CurrencyBaseModel",
        "nullable": true,
        "required": false
      },
      "language": {
        "type": "OrganizationDetailsLanguageSubModel",
        "nullable": true,
        "required": false
      },
      "formatting": {
        "type": "OrganizationDetailsFormattingSubModel",
        "nullable": true,
        "required": false
      },
      "timezone": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "activeCompanies": {
        "type": "array<CompanyModel>",
        "nullable": true,
        "required": false
      },
      "activeAddons": {
        "type": "array",
        "nullable": true,
        "required": false
      }
    }
  },
  "OrganizationDetailsCountrySubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "englishName": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "UserWithNameAndPhotoFileModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "OrganizationDetailsLanguageSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "OrganizationDetailsFormattingSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "CompanyModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "rootBusinessUnitGuid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "country": {
        "type": "CompanyCountry",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "currencyGuid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "currencyRate": {
        "type": "number:double",
        "format": "double",
        "readOnly": true,
        "required": false
      },
      "currencyCode": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "currencySymbol": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "CompanyCountry": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "code3": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "englishName": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "PhaseMemberOutputModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "user": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "currentWorkContractTitle": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "phase": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      }
    }
  },
  "DeletedPhaseMemberOutputModel": {
    "type": "object",
    "properties": {
      "deletedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "user": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "currentWorkContractTitle": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "phase": {
        "type": "ModelBase",
        "nullable": true,
        "required": false
      }
    }
  },
  "ModelBaseReadOnly": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "PhaseOutputModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "project": {
        "type": "PhaseProjectSubModel",
        "nullable": true,
        "required": false
      },
      "parentPhase": {
        "type": "ModelBaseWithRequiredGuid",
        "nullable": true,
        "required": false
      },
      "isCompleted": {
        "type": "boolean",
        "required": false
      },
      "isLocked": {
        "type": "boolean",
        "required": false
      },
      "startDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "deadline": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "workHoursEstimate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "originalWorkHoursEstimate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "originalStartDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "originalDeadline": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "defaultWorkType": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "currencyCode": {
        "type": "CurrencyBaseModel",
        "nullable": true,
        "required": false
      },
      "phaseStatus": {
        "type": "PhaseStatusOutputModel",
        "nullable": true,
        "required": false
      }
    }
  },
  "PhaseProjectSubModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "isInternal": {
        "type": "boolean",
        "readOnly": true,
        "required": false
      },
      "isClosed": {
        "type": "boolean",
        "readOnly": true,
        "required": false
      }
    }
  },
  "PhaseStatusOutputModel": {
    "type": "object",
    "properties": {
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "phaseStatusTypeGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "PhaseInputModel": {
    "type": "object",
    "required": [
      "name",
      "parentPhase"
    ],
    "properties": {
      "name": {
        "type": "string",
        "required": true
      },
      "project": {
        "type": "ModelBaseWithRequiredGuid",
        "nullable": true,
        "required": false
      },
      "parentPhase": {
        "type": "ModelBaseWithRequiredGuid",
        "required": true
      },
      "startDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "deadline": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "workHoursEstimate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "originalWorkHoursEstimate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "originalStartDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "originalDeadline": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "defaultWorkType": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "phaseStatus": {
        "type": "PhaseStatusInputModel",
        "nullable": true,
        "required": false
      },
      "isCompleted": {
        "type": "boolean",
        "required": false
      },
      "isClosed": {
        "type": "boolean",
        "required": false
      },
      "isLocked": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "PhaseStatusInputModel": {
    "type": "object",
    "properties": {
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "phaseStatusTypeGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "PhaseModelWithHierarchyInfo": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "project": {
        "type": "PhaseProjectSubModel",
        "nullable": true,
        "required": false
      },
      "parentPhase": {
        "type": "ModelBaseWithRequiredGuid",
        "nullable": true,
        "required": false
      },
      "isCompleted": {
        "type": "boolean",
        "required": false
      },
      "isLocked": {
        "type": "boolean",
        "required": false
      },
      "startDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "deadline": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "workHoursEstimate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "originalWorkHoursEstimate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "originalStartDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "originalDeadline": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "defaultWorkType": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "currencyCode": {
        "type": "CurrencyBaseModel",
        "nullable": true,
        "required": false
      },
      "phaseStatus": {
        "type": "PhaseStatusOutputModel",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "customer": {
        "type": "PhaseCustomerSubModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "hasChildren": {
        "type": "boolean",
        "required": false
      },
      "level": {
        "type": "integer:int32",
        "format": "int32",
        "required": false
      }
    }
  },
  "PhaseCustomerSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "required": false
      },
      "isInternal": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "ActivityModel": {
    "type": "object",
    "required": [
      "startDateTime",
      "activityType",
      "ownerUser",
      "name"
    ],
    "properties": {
      "startDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "required": true
      },
      "endDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      },
      "isClosed": {
        "type": "boolean",
        "required": false
      },
      "isAllDay": {
        "type": "boolean",
        "required": false
      },
      "hasDuration": {
        "type": "boolean",
        "required": false
      },
      "isUnassigned": {
        "type": "boolean",
        "required": false
      },
      "hasHours": {
        "type": "boolean",
        "readOnly": true,
        "required": false
      },
      "notes": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "location": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "activityType": {
        "type": "ActivityActivityType",
        "required": true
      },
      "ownerUser": {
        "type": "ActivityOwnerModel",
        "required": true
      },
      "customer": {
        "type": "ActivityCustomer",
        "nullable": true,
        "required": false
      },
      "phase": {
        "type": "ActivityPhase",
        "nullable": true,
        "required": false
      },
      "recurrenceParentActivityGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectTaskStatus": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "recurrence": {
        "type": "ActivityRecurrenceModel",
        "nullable": true,
        "required": false
      },
      "recurrenceRule": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "recurrenceType": {
        "type": "RecurrenceType",
        "readOnly": true,
        "required": false
      },
      "isApproved": {
        "type": "boolean",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "ActivityActivityType": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "category": {
        "type": "ActivityCategory",
        "readOnly": true,
        "required": false
      }
    }
  },
  "ActivityOwnerModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "code": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "keywords": {
        "type": "array<ActivityOwnerKeyword>",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "ActivityOwnerKeyword": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "value": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ActivityCustomer": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "ActivityPhase": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isLocked": {
        "type": "boolean",
        "readOnly": true,
        "required": false
      },
      "projectGuid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "projectName": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "projectNumber": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "projectOwnerGuid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "ActivityRecurrenceModel": {
    "type": "object",
    "required": [
      "frequency"
    ],
    "properties": {
      "frequency": {
        "type": "RecurrenceFrequency",
        "required": true
      },
      "pattern": {
        "type": "RecurrencePattern",
        "nullable": true,
        "required": false
      },
      "range": {
        "type": "RecurrenceRange",
        "nullable": true,
        "required": false
      },
      "exceptions": {
        "type": "array",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastOccurrenceDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      }
    }
  },
  "RecurrenceFrequency": {
    "type": "string",
    "enum": [
      "Daily",
      "Weekly",
      "Monthly",
      "Yearly"
    ],
    "description": "",
    "properties": {}
  },
  "RecurrencePattern": {
    "type": "object",
    "properties": {
      "daily": {
        "type": "DailyModel",
        "nullable": true,
        "required": false
      },
      "weekly": {
        "type": "WeeklyModel",
        "nullable": true,
        "required": false
      },
      "monthly": {
        "type": "MonthlyModel",
        "nullable": true,
        "required": false
      },
      "yearly": {
        "type": "YearlyModel",
        "nullable": true,
        "required": false
      }
    }
  },
  "DailyModel": {
    "type": "object",
    "properties": {
      "interval": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "everyWeekday": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "WeeklyModel": {
    "type": "object",
    "properties": {
      "interval": {
        "type": "integer:int32",
        "format": "int32",
        "required": false
      },
      "monday": {
        "type": "boolean",
        "required": false
      },
      "tuesday": {
        "type": "boolean",
        "required": false
      },
      "wednesday": {
        "type": "boolean",
        "required": false
      },
      "thursday": {
        "type": "boolean",
        "required": false
      },
      "friday": {
        "type": "boolean",
        "required": false
      },
      "saturday": {
        "type": "boolean",
        "required": false
      },
      "sunday": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "MonthlyModel": {
    "type": "object",
    "properties": {
      "interval": {
        "type": "integer:int32",
        "format": "int32",
        "required": false
      },
      "dayOfMonth": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "dayOrdinal": {
        "type": "DayOrdinal",
        "nullable": true,
        "required": false
      },
      "dayOrdinalOption": {
        "type": "DayOrdinalOption",
        "nullable": true,
        "required": false
      }
    }
  },
  "DayOrdinal": {
    "type": "string",
    "enum": [
      "First",
      "Second",
      "Third",
      "Fourth",
      "Last"
    ],
    "description": "",
    "properties": {}
  },
  "DayOrdinalOption": {
    "type": "string",
    "enum": [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "WeekDay",
      "Saturday",
      "WeekendDay",
      "Day"
    ],
    "description": "",
    "properties": {}
  },
  "YearlyModel": {
    "type": "object",
    "properties": {
      "dayOfMonth": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "month": {
        "type": "Months",
        "required": false
      },
      "dayOrdinal": {
        "type": "DayOrdinal",
        "nullable": true,
        "required": false
      },
      "dayOrdinalOption": {
        "type": "DayOrdinalOption",
        "nullable": true,
        "required": false
      }
    }
  },
  "Months": {
    "type": "string",
    "enum": [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    "description": "",
    "properties": {}
  },
  "RecurrenceRange": {
    "type": "object",
    "properties": {
      "maxOccurrences": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "recursUntilDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      }
    }
  },
  "RecurrenceType": {
    "type": "string",
    "enum": [
      "None",
      "Occurrence",
      "Exception",
      "Series"
    ],
    "description": "",
    "properties": {}
  },
  "PhaseStatusTypeModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "name": {
        "type": "string",
        "required": true
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "ProjectFeeOutputModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "project": {
        "type": "ProjectFeeProjectSubModel",
        "nullable": true,
        "required": false
      },
      "phase": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "customer": {
        "type": "ProjectFeeCustomerSubModel",
        "nullable": true,
        "required": false
      },
      "product": {
        "type": "ProjectFeeProductSubModel",
        "nullable": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "unitPrice": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "unitCost": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "quantity": {
        "type": "number:double",
        "format": "double",
        "required": false
      },
      "measurementUnit": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "hasVolumePricing": {
        "type": "boolean",
        "required": false
      },
      "productType": {
        "type": "ProductType",
        "nullable": true,
        "required": false
      },
      "vatRate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "displayPeriodStartDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "user": {
        "type": "UserSubModel",
        "nullable": true,
        "required": false
      },
      "costCenter": {
        "type": "ProjectCostCenterSubModel",
        "nullable": true,
        "required": false
      },
      "salesAccount": {
        "type": "ProjectSalesAccountSubModel",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "eventDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "billingSchedule": {
        "type": "ProjectFeeBillingScheduleType",
        "nullable": true,
        "required": false
      },
      "plannedBillingDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "billingDependencyPhase": {
        "type": "ProjectFeePhaseSubModel",
        "nullable": true,
        "required": false
      },
      "isBillable": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "externalID": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "invoice": {
        "type": "ProjectFeeInvoiceSubModel",
        "nullable": true,
        "required": false
      },
      "invoiceRowGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "invoiceRowDescription": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "invoiceQuantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "invoiceRowComment": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isRecurrenceRule": {
        "type": "boolean",
        "required": false
      },
      "recurrenceRuleGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectFeeProjectSubModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "companyGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectFeeCustomerSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectFeeProductSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProductType": {
    "type": "string",
    "enum": [
      "FixedFees",
      "Materials",
      "Subcontracting"
    ],
    "description": "",
    "properties": {}
  },
  "UserSubModel": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "companyGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectCostCenterSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "identifier": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectSalesAccountSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectFeeBillingScheduleType": {
    "type": "string",
    "enum": [
      "Immediately",
      "OnDate",
      "WhenPhaseCompleted",
      "Recurring"
    ],
    "description": "",
    "properties": {}
  },
  "ProjectFeePhaseSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isCompleted": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "ProjectFeeInvoiceSubModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "date": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      }
    }
  },
  "DeletedProjectFeeModel": {
    "type": "object",
    "properties": {
      "deletedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "ModelBaseReadOnly",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "ModelBaseReadOnly",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "phase": {
        "type": "ModelBaseReadOnly",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "project": {
        "type": "ModelBaseReadOnly",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "customer": {
        "type": "ModelBaseReadOnly",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "user": {
        "type": "ModelBaseReadOnly",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "product": {
        "type": "ModelBaseReadOnly",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "eventDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "quantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "measurementUnit": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProductOutputModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "unitPrice": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "unitCost": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "vatRate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "measurementUnit": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "productCategory": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "salesAccount": {
        "type": "ProductSalesAccountSubModel",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "type": {
        "type": "ProductType",
        "nullable": true,
        "required": false
      },
      "proposalDescription": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProductSalesAccountSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProductForProjectOutputModel": {
    "type": "object",
    "properties": {
      "product": {
        "type": "ProductOutputModel",
        "nullable": true,
        "required": false
      },
      "isVolumePriced": {
        "type": "boolean",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProductCountrySettingsModel": {
    "type": "object",
    "required": [
      "country",
      "product"
    ],
    "properties": {
      "country": {
        "type": "ModelBaseWithRequiredGuid",
        "required": true
      },
      "product": {
        "type": "ModelBaseWithRequiredGuid",
        "required": true
      },
      "vatRate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "ProjectBillingCustomerModel": {
    "type": "object",
    "required": [
      "project",
      "billingCustomer"
    ],
    "properties": {
      "project": {
        "type": "ModelBaseWithRequiredGuid",
        "required": true
      },
      "billingCustomer": {
        "type": "BillingCustomerModel",
        "required": true
      },
      "isDefault": {
        "type": "boolean",
        "required": false
      },
      "canBeDeleted": {
        "type": "boolean",
        "readOnly": true,
        "required": false
      },
      "billingAddress": {
        "type": "BillingAddressModel",
        "nullable": true,
        "required": false
      },
      "billingContact": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "eInvoicingInfo": {
        "type": "CustomerEInvoicingModel",
        "nullable": true,
        "required": false
      },
      "deliveryAddress": {
        "type": "BillingAddressModel",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "BillingCustomerModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "eInvoiceAddress": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "eInvoiceOperator": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "BillingAddressModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "addressline": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "postalCode": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "city": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "country": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "ProjectOutputModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "projectStatus": {
        "type": "ProjectStatusSubModel",
        "nullable": true,
        "required": false
      },
      "isInternal": {
        "type": "boolean",
        "required": false
      },
      "internalName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isClosed": {
        "type": "boolean",
        "required": false
      },
      "closedDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "isJoiningAllowed": {
        "type": "boolean",
        "required": false
      },
      "customer": {
        "type": "ProjectCustomerSubModel",
        "nullable": true,
        "required": false
      },
      "projectOwner": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "required": false
      },
      "businessUnit": {
        "type": "BusinessUnitSubModel",
        "nullable": true,
        "required": false
      },
      "currency": {
        "type": "CurrencySubModel2",
        "nullable": true,
        "required": false
      },
      "customerContact": {
        "type": "CustomerContactSubModel",
        "nullable": true,
        "required": false
      },
      "salesStatus": {
        "type": "SalesStatusSubModel",
        "nullable": true,
        "required": false
      },
      "salesPerson": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "required": false
      },
      "probability": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "expectedOrderDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "expectedValue": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "startDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "deadline": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "leadSource": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "rootPhase": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "pricelist": {
        "type": "ProjectPricelistSubModel",
        "nullable": true,
        "required": false
      },
      "costCenter": {
        "type": "ProjectCostCenterSubModel",
        "nullable": true,
        "required": false
      },
      "paymentTerm": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "ourReference": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "yourReference": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "orderNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "invoiceNotes": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "billingContact": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "required": false
      },
      "invoiceTemplate": {
        "type": "ProjectInvoiceTemplateSubModel",
        "nullable": true,
        "required": false
      },
      "useWorkTypesFromSetting": {
        "type": "boolean",
        "required": false
      },
      "defaultWorkType": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "useProductsFromSetting": {
        "type": "boolean",
        "required": false
      },
      "isMileageBillable": {
        "type": "boolean",
        "required": false
      },
      "isDailyAllowanceBillable": {
        "type": "boolean",
        "required": false
      },
      "isOtherTravelExpensesBillable": {
        "type": "boolean",
        "required": false
      },
      "useOvertimeMultipliers": {
        "type": "boolean",
        "required": false
      },
      "keywords": {
        "type": "array<ModelWithName>",
        "nullable": true,
        "required": false
      },
      "completionEstimatePercentage": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "calculatedCompletionPercentage": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "ProjectStatusSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectStatusTypeGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "ProjectCustomerSubModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "required": false
      }
    }
  },
  "BusinessUnitSubModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "companyGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "companyName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "companyBusinessUnitGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "companyCountryGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "companyCurrencyGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "CurrencySubModel2": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "symbol": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "CustomerContactSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "firstName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "lastName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isDeleted": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "SalesStatusSubModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "salesStatusTypeGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectPricelistSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isCustom": {
        "type": "boolean",
        "required": false
      },
      "isVolumePricing": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "ProjectInvoiceTemplateSubModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "templateInvoiceGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectInputModelBase": {
    "type": "object",
    "required": [
      "name",
      "customer",
      "projectOwner"
    ],
    "properties": {
      "name": {
        "type": "string",
        "required": true
      },
      "customer": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "projectOwner": {
        "type": "SimpleInputModel",
        "required": true
      },
      "isInternal": {
        "type": "boolean",
        "required": false
      },
      "internalName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isClosed": {
        "type": "boolean",
        "required": false
      },
      "isJoiningAllowed": {
        "type": "boolean",
        "required": false
      },
      "businessUnit": {
        "type": "SimpleInputRequiredModel",
        "nullable": true,
        "required": false
      },
      "customerContact": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "salesPerson": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "startDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "deadline": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "leadSource": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "costCenter": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "paymentTerm": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "ourReference": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "yourReference": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "orderNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "invoiceNotes": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "billingContact": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "invoiceTemplate": {
        "type": "InvoiceTemplateSubModel",
        "nullable": true,
        "required": false
      },
      "useOvertimeMultipliers": {
        "type": "boolean",
        "required": false
      },
      "useWorktypesFromSetting": {
        "type": "boolean",
        "required": false
      },
      "useProductsFromSetting": {
        "type": "boolean",
        "required": false
      },
      "completionEstimatePercentage": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "salesStatus": {
        "type": "SimpleSalesStatusInputModel",
        "nullable": true,
        "required": false
      },
      "projectStatus": {
        "type": "SimpleProjectStatusInputModel",
        "nullable": true,
        "required": false
      },
      "currency": {
        "type": "SimpleInputRequiredModel",
        "nullable": true,
        "required": false
      },
      "probability": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "expectedOrderDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "expectedValue": {
        "type": "MoneyInputModelWithNullableAmount",
        "nullable": true,
        "required": false
      }
    }
  },
  "InvoiceTemplateSubModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "templateInvoiceGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "SimpleSalesStatusInputModel": {
    "type": "object",
    "properties": {
      "salesStatusTypeGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "SimpleProjectStatusInputModel": {
    "type": "object",
    "properties": {
      "projectStatusTypeGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "MoneyInputModelWithNullableAmount": {
    "type": "object",
    "required": [
      "currencyCode"
    ],
    "properties": {
      "amount": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "currencyCode": {
        "type": "string",
        "required": true
      }
    }
  },
  "ProjectTravelExpenseOutputModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "project": {
        "type": "ProjectTravelExpenseProjectSubModel",
        "nullable": true,
        "required": false
      },
      "phase": {
        "type": "ModelBaseWithRequiredGuid",
        "nullable": true,
        "required": false
      },
      "customer": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "user": {
        "type": "UserRequiredSubModel",
        "nullable": true,
        "required": false
      },
      "travelExpense": {
        "type": "TravelExpenseSubModel",
        "nullable": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "unitPrice": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "unitCost": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "unitCostExcludingPurchaseVat": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "quantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "measurementUnit": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "vatRate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "purchaseVatRate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "eventDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "travelStartTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      },
      "travelEndTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      },
      "travelReimbursementRequired": {
        "type": "boolean",
        "required": false
      },
      "travelReimbursement": {
        "type": "TravelReimbursementSubModel",
        "nullable": true,
        "required": false
      },
      "isBillable": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "billingSchedule": {
        "type": "ProjectTravelExpenseBillingScheduleType",
        "nullable": true,
        "required": false
      },
      "plannedBillingDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "billingDependencyPhase": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "invoice": {
        "type": "InvoiceSubModel",
        "nullable": true,
        "required": false
      },
      "invoiceQuantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "invoiceRowGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "invoiceRowDescription": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "invoiceRowComment": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "costAccount": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "costCenter": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "salesAccount": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "attachmentCount": {
        "type": "integer:int32",
        "format": "int32",
        "required": false
      }
    }
  },
  "ProjectTravelExpenseProjectSubModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "companyGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isInternal": {
        "type": "boolean",
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "required": false
      }
    }
  },
  "UserRequiredSubModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "code": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "companyGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "TravelExpenseSubModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "expenseClass": {
        "type": "ExpensesClass",
        "required": false
      },
      "includeTime": {
        "type": "boolean",
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ExpensesClass": {
    "type": "string",
    "enum": [
      "Mileage",
      "DailyAllowance",
      "OtherTravelExpense"
    ],
    "description": "",
    "properties": {}
  },
  "TravelReimbursementSubModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isApproved": {
        "type": "boolean",
        "required": false
      },
      "isLocked": {
        "type": "boolean",
        "required": false
      },
      "status": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectTravelExpenseBillingScheduleType": {
    "type": "string",
    "enum": [
      "Immediately",
      "WhenPhaseCompleted",
      "OnDate"
    ],
    "description": "",
    "properties": {}
  },
  "InvoiceSubModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "date": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      }
    }
  },
  "DeletedProjectTravelExpenseModel": {
    "type": "object",
    "properties": {
      "deletedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "ModelBaseReadOnly",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "ModelBaseReadOnly",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "phase": {
        "type": "ModelBaseReadOnly",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "project": {
        "type": "ModelBaseReadOnly",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "customer": {
        "type": "ModelBaseReadOnly",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "user": {
        "type": "ModelBaseReadOnly",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "travelExpense": {
        "type": "ModelBaseReadOnly",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "eventDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "quantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "measurementUnit": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "travelStartTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "travelEndTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "PublicAuthenticationOutputModel": {
    "type": "object",
    "properties": {
      "access_token": {
        "type": "string",
        "required": false
      },
      "scope": {
        "type": "string",
        "required": false
      },
      "refresh_token": {
        "type": "string",
        "required": false
      },
      "refresh_token_expires_in": {
        "type": "integer:uint64",
        "format": "uint64",
        "required": false
      },
      "refresh_token_expires_utc": {
        "type": "string:date-time",
        "format": "date-time",
        "required": false
      },
      "access_token_type": {
        "type": "string",
        "required": false
      },
      "access_token_expires_in": {
        "type": "integer:uint64",
        "format": "uint64",
        "required": false
      },
      "access_token_expires_utc": {
        "type": "string:date-time",
        "format": "date-time",
        "required": false
      }
    }
  },
  "ClientCredentials": {
    "type": "object",
    "required": [
      "client_id",
      "client_secret"
    ],
    "properties": {
      "client_id": {
        "type": "string",
        "required": true
      },
      "client_secret": {
        "type": "string",
        "required": true
      },
      "scope": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "AccessTokenCredentials": {
    "type": "object",
    "properties": {
      "grant_type": {
        "type": "GrantType",
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "redirect_uri": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "client_id": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "client_secret": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "scope": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "state": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "refresh_token": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "GrantType": {
    "type": "string",
    "enum": [
      "client_credentials",
      "authorization_code",
      "refresh_token"
    ],
    "description": "",
    "properties": {}
  },
  "OAuthOutputModel": {
    "type": "object",
    "properties": {
      "access_token": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "token_type": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "expires_in": {
        "type": "integer:uint64",
        "format": "uint64",
        "required": false
      },
      "refresh_token": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "scope": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "OAuthErrorOutputModel": {
    "type": "object",
    "properties": {
      "error": {
        "type": "OAuthError",
        "required": false
      },
      "error_description": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "OAuthError": {
    "type": "string",
    "enum": [
      "invalid_request",
      "invalid_client",
      "invalid_grant",
      "invalid_scope",
      "unauthorized_client",
      "unsupported_grant_type"
    ],
    "description": "",
    "properties": {}
  },
  "ReimbursedProjectFeeOutputModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "eventDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "phase": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "project": {
        "type": "ReimbursedProjectFeeProjectSubModel",
        "nullable": true,
        "required": false
      },
      "product": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "unitPrice": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "unitCost": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "quantity": {
        "type": "number:double",
        "format": "double",
        "required": false
      },
      "measurementUnit": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "vatRate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "user": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "invoiceGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "invoiceQuantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "invoiceRowGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "invoiceRowDescription": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "productType": {
        "type": "ProductType",
        "nullable": true,
        "required": false
      }
    }
  },
  "ReimbursedProjectFeeProjectSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "SalesStatusTypeOutputModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": false,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": false,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "salesState": {
        "type": "SalesStatusType",
        "required": false
      },
      "defaultProbability": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "isProposalDefault": {
        "type": "boolean",
        "nullable": true,
        "required": false
      }
    }
  },
  "SalesStatusType": {
    "type": "string",
    "enum": [
      "InProgress",
      "Won",
      "Lost"
    ],
    "description": "",
    "properties": {}
  },
  "SalesStatusTypeInputModel": {
    "type": "object",
    "required": [
      "name",
      "salesState"
    ],
    "properties": {
      "name": {
        "type": "string",
        "required": true
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "salesState": {
        "type": "SalesStatusType",
        "required": true
      },
      "defaultProbability": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "isProposalDefault": {
        "type": "boolean",
        "nullable": true,
        "required": false
      }
    }
  },
  "TravelExpenseTypeCountrySettingsModel": {
    "type": "object",
    "required": [
      "country",
      "product"
    ],
    "properties": {
      "country": {
        "type": "ModelBaseWithRequiredGuid",
        "required": true
      },
      "product": {
        "type": "ModelBaseWithRequiredGuid",
        "required": true
      },
      "vatRate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "purchaseVatRate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      }
    }
  },
  "UserOutputModel": {
    "type": "object",
    "required": [
      "firstName",
      "lastName"
    ],
    "properties": {
      "firstName": {
        "type": "string",
        "required": true
      },
      "lastName": {
        "type": "string",
        "required": true
      },
      "salutation": {
        "type": "SalutationType",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "email": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "phone": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "socialSecurityNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "businessUnit": {
        "type": "BusinessUnitSubModel",
        "nullable": true,
        "required": false
      },
      "workType": {
        "type": "ModelBaseWithRequiredGuid",
        "nullable": true,
        "required": false
      },
      "permissionProfile": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "superiorUser": {
        "type": "ModelBaseWithRequiredGuid",
        "nullable": true,
        "required": false
      },
      "workContract": {
        "type": "UserWorkContractSubModel",
        "nullable": true,
        "required": false
      },
      "lastLogin": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      },
      "title": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "satisfaction": {
        "type": "SatisfactionLevelType",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "address": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "postalCode": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "city": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "country": {
        "type": "UserCountrySubModel",
        "nullable": true,
        "required": false
      },
      "countryRegion": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "culture": {
        "type": "UserCultureSubModel",
        "nullable": true,
        "required": false
      },
      "language": {
        "type": "UserLanguageSubModel",
        "nullable": true,
        "required": false
      },
      "timezone": {
        "type": "TimezoneModel",
        "nullable": true,
        "required": false
      },
      "birthDate": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      },
      "bankAccountNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "notes": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "keywords": {
        "type": "array<UserKeywordSubModel>",
        "nullable": true,
        "required": false
      },
      "defaultActivityType": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "userType": {
        "type": "LicenseUserType",
        "nullable": true,
        "required": false
      },
      "notificationSettings": {
        "type": "UserNotificationSettingsModel",
        "nullable": true,
        "required": false
      }
    }
  },
  "UserWorkContractSubModel": {
    "type": "object",
    "required": [
      "title",
      "startDate"
    ],
    "properties": {
      "title": {
        "type": "string",
        "required": true
      },
      "startDate": {
        "type": "string:date",
        "format": "date",
        "required": true
      },
      "endDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "dailyHours": {
        "type": "number:double",
        "format": "double",
        "required": false
      },
      "isOvertimeAllowed": {
        "type": "boolean",
        "required": false
      },
      "isFlextimeActive": {
        "type": "boolean",
        "required": false
      },
      "flextimeLimitPerDay": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "workWeek": {
        "type": "array<Workweek>",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "hourCost": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      }
    }
  },
  "UserCountrySubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "code3": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "englishName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "hasRegions": {
        "type": "CountryRegionsStatus",
        "required": false
      }
    }
  },
  "UserCultureSubModel": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "englishName": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "UserLanguageSubModel": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "englishName": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "TimezoneModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "systemName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "ianaName": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "UserKeywordSubModel": {
    "type": "object",
    "properties": {
      "value": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "LicenseUserType": {
    "type": "string",
    "enum": [
      "FullUser",
      "Employee",
      "RestrictedEmployee",
      "Subcontractor"
    ],
    "description": "",
    "properties": {}
  },
  "UserNotificationSettingsModel": {
    "type": "object",
    "properties": {
      "sendNewActivityEmail": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "sendTodaysAgendaEmail": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "sendWeeklySummaryEmail": {
        "type": "boolean",
        "nullable": true,
        "required": false
      }
    }
  },
  "GetUsersPurpose": {
    "type": "string",
    "enum": [
      "AbsenceOwner",
      "AccountOwner",
      "ActivityOwner",
      "ActivityParticipant",
      "BillingContact",
      "ProjectManager",
      "SalesPerson",
      "SuperiorUser",
      "TermsOfServiceApprover"
    ],
    "description": "Purpose used for getting the users.",
    "properties": {}
  },
  "TravelReimbursementOutputModel": {
    "type": "object",
    "properties": {
      "user": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "title": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "date": {
        "type": "string:date-time",
        "format": "date-time",
        "required": false
      },
      "approvalDate": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      },
      "approvedByUser": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "advancePayment": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "total": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "totalExpenses": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "groupBy": {
        "type": "GroupByType",
        "required": false
      },
      "canChangeApproval": {
        "type": "boolean",
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "travelReimbursementStatus": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      }
    }
  },
  "GroupByType": {
    "type": "string",
    "enum": [
      "None",
      "Date",
      "Category",
      "Project"
    ],
    "description": "",
    "properties": {}
  },
  "TravelReimbursementInputModel": {
    "type": "object",
    "required": [
      "user"
    ],
    "properties": {
      "title": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "advancePayment": {
        "type": "MoneyInputModelWithNullableAmount",
        "nullable": true,
        "required": false
      },
      "groupBy": {
        "type": "GroupByType",
        "required": false
      },
      "travelReimbursementStatus": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "user": {
        "type": "ModelBaseWithRequiredGuid",
        "required": true
      }
    }
  },
  "WorkdayOutputModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "user": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "required": false
      },
      "date": {
        "type": "string:date",
        "format": "date",
        "required": false
      },
      "isCompleted": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "WorkdayModel": {
    "type": "object",
    "properties": {
      "date": {
        "type": "string:date",
        "format": "date",
        "required": false
      },
      "userGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isReadOnly": {
        "type": "boolean",
        "required": false
      },
      "isCompleted": {
        "type": "boolean",
        "required": false
      },
      "isOvertimeAllowed": {
        "type": "boolean",
        "required": false
      },
      "expectedHours": {
        "type": "number:double",
        "format": "double",
        "readOnly": true,
        "required": false
      },
      "enteredHours": {
        "type": "number:double",
        "format": "double",
        "required": false
      },
      "isHoliday": {
        "type": "boolean",
        "required": false
      },
      "holidayName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "flextimeLimitPerDay": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "absenceHours": {
        "type": "number:double",
        "format": "double",
        "required": false
      },
      "incompleteTimingMinutes": {
        "type": "integer:int32",
        "format": "int32",
        "required": false
      },
      "enteredTimeEntries": {
        "type": "number:double",
        "format": "double",
        "required": false
      }
    }
  },
  "WorkTypeOutputModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "isProductive": {
        "type": "boolean",
        "required": false
      },
      "isDefault": {
        "type": "boolean",
        "required": false
      },
      "salesAccount": {
        "type": "WorkTypeSalesAccountSubModel",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "hourCost": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      }
    }
  },
  "WorkTypeSalesAccountSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "VatRateOutputModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "percentage": {
        "type": "number:double",
        "format": "double",
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "isDefault": {
        "type": "boolean",
        "required": false
      },
      "countryGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "VatRateInputModel": {
    "type": "object",
    "required": [
      "percentage"
    ],
    "properties": {
      "percentage": {
        "type": "number:double",
        "format": "double",
        "required": true
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "isDefault": {
        "type": "boolean",
        "required": false
      },
      "countryGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "WorkHourOutputModel": {
    "type": "object",
    "required": [
      "eventDate"
    ],
    "properties": {
      "phase": {
        "type": "WorkHourPhaseSubModel",
        "nullable": true,
        "required": false
      },
      "customer": {
        "type": "WorkHourCustomerSubModel",
        "nullable": true,
        "required": false
      },
      "workType": {
        "type": "WorkHourWorkTypeSubModel",
        "nullable": true,
        "required": false
      },
      "invoice": {
        "type": "WorkHourInvoiceSubModel",
        "nullable": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "unitPrice": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "unitCost": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "invoiceRowDescription": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "invoiceQuantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "plannedInvoiceQuantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "isBillable": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "billableStatus": {
        "type": "BillableStatusType",
        "required": false
      },
      "isProductive": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "isApproved": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "isModifiable": {
        "type": "boolean",
        "required": false
      },
      "invoiceRowGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "invoiceRowComment": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "user": {
        "type": "UserWithFirstNameLastNamePhotoFileModelAndRequiredGuid",
        "nullable": true,
        "required": false
      },
      "overtime": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "eventDate": {
        "type": "string:date",
        "format": "date",
        "required": true
      },
      "quantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "startTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      },
      "endTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "project": {
        "type": "WorkHourProjectSubModel",
        "nullable": true,
        "required": false
      }
    }
  },
  "WorkHourPhaseSubModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "isCompleted": {
        "type": "boolean",
        "required": false
      },
      "isLocked": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "WorkHourCustomerSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "required": false
      }
    }
  },
  "WorkHourWorkTypeSubModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "WorkHourInvoiceSubModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "date": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      }
    }
  },
  "BillableStatusType": {
    "type": "string",
    "enum": [
      "Billable",
      "NotBillable",
      "RemovedFromInvoice"
    ],
    "description": "",
    "properties": {}
  },
  "WorkHourProjectSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "required": false
      },
      "companyGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isClosed": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "DeletedWorkHourModel": {
    "type": "object",
    "properties": {
      "deletedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "ModelBaseReadOnly",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "ModelBaseReadOnly",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "phase": {
        "type": "ModelBaseReadOnly",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "project": {
        "type": "ModelBaseReadOnly",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "customer": {
        "type": "ModelBaseReadOnly",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "user": {
        "type": "ModelBaseReadOnly",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "workType": {
        "type": "ModelBaseReadOnly",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "eventDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "quantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "plannedInvoiceQuantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "startTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "endTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "WorkHourInputModel": {
    "type": "object",
    "required": [
      "eventDate",
      "phase",
      "user",
      "workType"
    ],
    "properties": {
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "endTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      },
      "eventDate": {
        "type": "string:date",
        "format": "date",
        "required": true
      },
      "invoice": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "invoiceQuantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "plannedInvoiceQuantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "invoiceRowComment": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "invoiceRowDescription": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isApproved": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "isBillable": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "overtime": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "phase": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "quantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "startTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      },
      "unitPrice": {
        "type": "MoneyInputModel",
        "nullable": true,
        "required": false
      },
      "user": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "workType": {
        "type": "SimpleInputRequiredModel",
        "required": true
      }
    }
  },
  "ProjectStatusTypeModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "name": {
        "type": "string",
        "required": true
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "SalesStatusHistoryOutputModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "salesStatusType": {
        "type": "ModelWithName",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "project": {
        "type": "ModelWithName",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "timeStamp": {
        "type": "string:date-time",
        "format": "date-time",
        "required": false
      }
    }
  },
  "ProjectForecastOutputModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "project": {
        "type": "ModelBaseWithRequiredGuid",
        "nullable": true,
        "required": false
      },
      "month": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "year": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "billingForecast": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "billingForecastNotes": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "expenseForecast": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "expenseForecastNotes": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "revenueForecast": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "revenueForecastNotes": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "laborExpenseForecast": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "laborExpenseForecastNotes": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectForecastInputModel": {
    "type": "object",
    "required": [
      "project",
      "month",
      "year"
    ],
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "project": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "month": {
        "type": "integer:int32",
        "format": "int32",
        "required": true
      },
      "year": {
        "type": "integer:int32",
        "format": "int32",
        "required": true
      },
      "billingForecast": {
        "type": "MoneyInputModelWithNullableAmount",
        "nullable": true,
        "required": false
      },
      "billingForecastNotes": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "expenseForecast": {
        "type": "MoneyInputModelWithNullableAmount",
        "nullable": true,
        "required": false
      },
      "expenseForecastNotes": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "revenueForecast": {
        "type": "MoneyInputModelWithNullableAmount",
        "nullable": true,
        "required": false
      },
      "revenueForecastNotes": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "laborExpenseForecast": {
        "type": "MoneyInputModelWithNullableAmount",
        "nullable": true,
        "required": false
      },
      "laborExpenseForecastNotes": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "BankAccountOutputModel": {
    "type": "object",
    "required": [
      "bankName",
      "accountNumber"
    ],
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "bankName": {
        "type": "string",
        "required": true
      },
      "accountNumber": {
        "type": "string",
        "required": true
      },
      "bic": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "accountNumberFormat": {
        "type": "BankAccountFormat",
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "businessUnit": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "company": {
        "type": "ModelWithName",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "BankAccountFormat": {
    "type": "string",
    "enum": [
      "Iban",
      "Bankgiro"
    ],
    "description": "",
    "properties": {}
  },
  "CurrencyOutputModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "rate": {
        "type": "number:double",
        "format": "double",
        "required": false
      },
      "symbol": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "isOrganizationCurrency": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "FlatRateInputModel": {
    "type": "object",
    "required": [
      "phase",
      "billingSchedule"
    ],
    "properties": {
      "phase": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "billingSchedule": {
        "type": "BillingScheduleType",
        "required": true
      },
      "plannedBillingDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "price": {
        "type": "MoneyInputModelWithNullableAmount",
        "nullable": true,
        "required": false
      },
      "includesHours": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "billAdditionalHours": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "pricePerAdditionalHour": {
        "type": "MoneyInputModelWithNullableAmount",
        "nullable": true,
        "required": false
      }
    }
  },
  "PriceListOutputModel": {
    "type": "object",
    "required": [
      "name",
      "currency"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "isDefault": {
        "type": "boolean",
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "isCustom": {
        "type": "boolean",
        "required": false
      },
      "isVolumePricing": {
        "type": "boolean",
        "required": false
      },
      "currency": {
        "type": "PriceListCurrency2",
        "required": true
      }
    }
  },
  "PriceListCurrency2": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "symbol": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "CustomPriceListOutputModel": {
    "type": "object",
    "required": [
      "name",
      "currency"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "isDefault": {
        "type": "boolean",
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "isCustom": {
        "type": "boolean",
        "required": false
      },
      "isVolumePricing": {
        "type": "boolean",
        "required": false
      },
      "currency": {
        "type": "PriceListCurrency3",
        "required": true
      }
    }
  },
  "PriceListCurrency3": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "symbol": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "PricelistVersionOutputModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "pricelistGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "startDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProductPriceOutputModel": {
    "type": "object",
    "properties": {
      "prices": {
        "type": "array<ProductPriceModel>",
        "nullable": true,
        "required": false
      },
      "product": {
        "type": "ProductPriceProductOutputSubModel",
        "nullable": true,
        "required": false
      },
      "isAvailable": {
        "type": "boolean",
        "required": false
      },
      "isVolumePriced": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "ProductPriceModel": {
    "type": "object",
    "properties": {
      "price": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "pricelistVersionGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "priceSource": {
        "type": "PriceSource",
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "quantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      }
    }
  },
  "PriceSource": {
    "type": "string",
    "enum": [
      "ProductRegistry",
      "Pricelist",
      "Project"
    ],
    "description": "",
    "properties": {}
  },
  "ProductPriceProductOutputSubModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "productCode": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "productType": {
        "type": "ProductType",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "productCategory": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProductInputModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "name": {
        "type": "string",
        "required": true
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "unitPrice": {
        "type": "MoneyInputModelWithNullableAmount",
        "nullable": true,
        "required": false
      },
      "unitCost": {
        "type": "MoneyInputModelWithNullableAmount",
        "nullable": true,
        "required": false
      },
      "vatRate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "measurementUnit": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "productCategory": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "salesAccount": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "type": {
        "type": "ProductType",
        "nullable": true,
        "required": false
      },
      "proposalDescription": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectFeeInputModel": {
    "type": "object",
    "required": [
      "project"
    ],
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "billingDependencyPhase": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "billingSchedule": {
        "type": "ProjectFeeBillingScheduleType",
        "nullable": true,
        "required": false
      },
      "costCenter": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "displayPeriodStartDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "eventDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "hasVolumePricing": {
        "type": "boolean",
        "required": false
      },
      "invoice": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "invoiceQuantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "invoiceRowComment": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "invoiceRowDescription": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isBillable": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "measurementUnit": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "phase": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "plannedBillingDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "product": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "productType": {
        "type": "ProductType",
        "nullable": true,
        "required": false
      },
      "project": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "quantity": {
        "type": "number:double",
        "format": "double",
        "required": false
      },
      "salesAccount": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "unitCost": {
        "type": "MoneyInputModelWithNullableAmount",
        "nullable": true,
        "required": false
      },
      "unitPrice": {
        "type": "MoneyInputModelWithNullableAmount",
        "nullable": true,
        "required": false
      },
      "user": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "vatRate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "externalID": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectMemberCostExceptionOutputModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "user": {
        "type": "UserWithFirstNameLastNamePhotoFileModelAndRequiredGuid",
        "nullable": true,
        "required": false
      },
      "customer": {
        "type": "ProjectMemberCostExceptionProjectCustomerSubModel",
        "nullable": true,
        "required": false
      },
      "project": {
        "type": "ProjectMemberCostExceptionProjectSubModel",
        "nullable": true,
        "required": false
      },
      "cost": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "currentContractCost": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectMemberCostExceptionProjectCustomerSubModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectMemberCostExceptionProjectSubModel": {
    "type": "object",
    "required": [
      "guid"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "required": true
      },
      "name": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "required": false
      },
      "isClosed": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "ProjectMemberCostExceptionInputModel": {
    "type": "object",
    "required": [
      "user",
      "project"
    ],
    "properties": {
      "user": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "project": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "cost": {
        "type": "MoneyInputModelWithNullableAmount",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectRecurringFeeRuleOutputModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "project": {
        "type": "ProjectFeeProjectSubModel",
        "nullable": true,
        "required": false
      },
      "phase": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "customer": {
        "type": "ProjectFeeCustomerSubModel",
        "nullable": true,
        "required": false
      },
      "product": {
        "type": "ProjectFeeProductSubModel",
        "nullable": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "unitPrice": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "unitCost": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "quantity": {
        "type": "number:double",
        "format": "double",
        "required": false
      },
      "measurementUnit": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "hasVolumePricing": {
        "type": "boolean",
        "required": false
      },
      "productType": {
        "type": "ProductType",
        "nullable": true,
        "required": false
      },
      "vatRate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "displayPeriodStartDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "user": {
        "type": "UserSubModel",
        "nullable": true,
        "required": false
      },
      "costCenter": {
        "type": "ProjectCostCenterSubModel",
        "nullable": true,
        "required": false
      },
      "salesAccount": {
        "type": "ProjectSalesAccountSubModel",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "frequency": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "recurrenceStartDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "recurrenceEndType": {
        "type": "RecurrenceEndTypes",
        "nullable": true,
        "required": false
      },
      "recurrenceEndDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "recurrenceTimes": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "recurringSalesAccount": {
        "type": "ProjectSalesAccountSubModel",
        "nullable": true,
        "required": false
      },
      "generatedTimes": {
        "type": "integer:int32",
        "format": "int32",
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "RecurrenceEndTypes": {
    "type": "string",
    "enum": [
      "Never",
      "AfterNumberOfTimes",
      "OnDate"
    ],
    "description": "",
    "properties": {}
  },
  "BillablePeriod": {
    "type": "string",
    "enum": [
      "Any",
      "Past",
      "Future",
      "NowAndPast",
      "NowAndFuture"
    ],
    "description": "",
    "properties": {}
  },
  "ProjectRecurringFeeRuleInputModel": {
    "type": "object",
    "required": [
      "frequency",
      "project"
    ],
    "properties": {
      "frequency": {
        "type": "integer:int32",
        "format": "int32",
        "required": true
      },
      "recurrenceStartDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "recurrenceEndType": {
        "type": "RecurrenceEndTypes",
        "nullable": true,
        "required": false
      },
      "recurrenceEndDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "recurrenceTimes": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "recurringSalesAccount": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "project": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "phase": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "product": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "unitPrice": {
        "type": "MoneyInputModelWithNullableAmount",
        "nullable": true,
        "required": false
      },
      "unitCost": {
        "type": "MoneyInputModelWithNullableAmount",
        "nullable": true,
        "required": false
      },
      "quantity": {
        "type": "number:double",
        "format": "double",
        "required": false
      },
      "measurementUnit": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "hasVolumePricing": {
        "type": "boolean",
        "required": false
      },
      "productType": {
        "type": "ProductType",
        "nullable": true,
        "required": false
      },
      "vatRate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "displayPeriodStartDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "user": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "costCenter": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "salesAccount": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProjectTravelExpenseInputModel": {
    "type": "object",
    "required": [
      "phase",
      "project",
      "quantity",
      "travelExpense",
      "user"
    ],
    "properties": {
      "billingDependencyPhase": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "billingSchedule": {
        "type": "ProjectTravelExpenseBillingScheduleType",
        "nullable": true,
        "required": false
      },
      "costAccount": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "costCenter": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "eventDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "invoice": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "invoiceQuantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "invoiceRowComment": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "invoiceRowDescription": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isBillable": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "measurementUnit": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "phase": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "plannedBillingDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "project": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "purchaseVatRate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "quantity": {
        "type": "number:double",
        "format": "double",
        "required": true
      },
      "salesAccount": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "travelEndTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      },
      "travelExpense": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "travelReimbursement": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "travelReimbursementRequired": {
        "type": "boolean",
        "required": false
      },
      "travelStartTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      },
      "unitCost": {
        "type": "MoneyInputModel",
        "nullable": true,
        "required": false
      },
      "unitPrice": {
        "type": "MoneyInputModel",
        "nullable": true,
        "required": false
      },
      "user": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "vatRate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      }
    }
  },
  "ReimbursedProjectTravelExpenseOutputModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "eventDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "phase": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "project": {
        "type": "ReimbursedProjectFeeProjectSubModel",
        "nullable": true,
        "required": false
      },
      "product": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "unitPrice": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "unitCost": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "quantity": {
        "type": "number:double",
        "format": "double",
        "required": false
      },
      "measurementUnit": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "vatRate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "user": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "invoiceGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "invoiceQuantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "invoiceRowGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "invoiceRowDescription": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "travelStartTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      },
      "travelEndTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      }
    }
  },
  "ReimbursedWorkHourOutputModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "user": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "overtime": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "eventDate": {
        "type": "string:date",
        "format": "date",
        "required": false
      },
      "quantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "startTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      },
      "endTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      },
      "phase": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "project": {
        "type": "ReimbursedWorkHourProjectSubModel",
        "nullable": true,
        "required": false
      },
      "customer": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "workType": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "invoiceGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "invoiceRowGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "unitPrice": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "unitCost": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "invoiceRowDescription": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "invoiceQuantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "invoiceRowComment": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "plannedInvoiceQuantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      }
    }
  },
  "ReimbursedWorkHourProjectSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "required": false
      }
    }
  },
  "TeamProductivityOutputModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "user": {
        "type": "TeamProductivityUserModel",
        "nullable": true,
        "required": false
      },
      "workHours": {
        "type": "number:double",
        "format": "double",
        "required": false
      },
      "workHoursValue": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "workHoursCost": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "workHoursBillable": {
        "type": "number:double",
        "format": "double",
        "required": false
      },
      "calculatedShareOfBilling": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "calculatedShareOfBillingPercentage": {
        "type": "number:double",
        "format": "double",
        "required": false
      },
      "adjustedShareOfBilling": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "adjustedShareOfBillingPercentage": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "billableHoursPercentage": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      }
    }
  },
  "TeamProductivityUserModel": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "title": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "TravelExpenseTypeOutputModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "isMileage": {
        "type": "boolean",
        "required": false
      },
      "isDailyAllowance": {
        "type": "boolean",
        "required": false
      },
      "expenseClass": {
        "type": "ExpensesClass",
        "nullable": true,
        "required": false
      },
      "purchaseVatRate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "includeTime": {
        "type": "boolean",
        "required": false
      },
      "costAccount": {
        "type": "TravelExpenseCostAccountSubModel",
        "nullable": true,
        "required": false
      },
      "unitCost": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "vatRate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "measurementUnit": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "productCategory": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "salesAccount": {
        "type": "ProductSalesAccountSubModel2",
        "nullable": true,
        "required": false
      }
    }
  },
  "TravelExpenseCostAccountSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "ProductSalesAccountSubModel2": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "TravelExpenseTypeInputModel": {
    "type": "object",
    "required": [
      "name",
      "expenseClass",
      "unitCost"
    ],
    "properties": {
      "name": {
        "type": "string",
        "required": true
      },
      "expenseClass": {
        "type": "ExpensesClass",
        "required": true
      },
      "purchaseVatRate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "includeTime": {
        "type": "boolean",
        "required": false
      },
      "costAccount": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "unitCost": {
        "type": "MoneyInputModelWithNullableAmount",
        "required": true
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "vatRate": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "measurementUnit": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "productCategory": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "salesAccount": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      }
    }
  },
  "TravelPriceOutputModel": {
    "type": "object",
    "properties": {
      "prices": {
        "type": "array<PriceModelBase>",
        "nullable": true,
        "required": false
      },
      "product": {
        "type": "TravelPriceProductSubModel",
        "nullable": true,
        "required": false
      }
    }
  },
  "PriceModelBase": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "price": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      },
      "pricelistVersionGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "priceSource": {
        "type": "PriceSource",
        "required": false
      }
    }
  },
  "TravelPriceProductSubModel": {
    "type": "object",
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "productCode": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "expenseClass": {
        "type": "ExpensesClass",
        "nullable": true,
        "required": false
      }
    }
  },
  "UserInputModel": {
    "type": "object",
    "required": [
      "firstName",
      "lastName"
    ],
    "properties": {
      "firstName": {
        "type": "string",
        "required": true
      },
      "lastName": {
        "type": "string",
        "required": true
      },
      "salutation": {
        "type": "SalutationType",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "email": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "phone": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "socialSecurityNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "businessUnit": {
        "type": "SimpleInputRequiredModel",
        "nullable": true,
        "required": false
      },
      "workType": {
        "type": "SimpleInputRequiredModel",
        "nullable": true,
        "required": false
      },
      "superiorUser": {
        "type": "SimpleInputRequiredModel",
        "nullable": true,
        "required": false
      },
      "satisfaction": {
        "type": "SatisfactionLevelType",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "address": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "postalCode": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "city": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "country": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "countryRegion": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "culture": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "language": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "timezone": {
        "type": "TimezoneModel",
        "nullable": true,
        "required": false
      },
      "birthDate": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      },
      "bankAccountNumber": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "notes": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "defaultActivityType": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "userType": {
        "type": "LicenseUserType",
        "nullable": true,
        "required": false
      },
      "permissionProfile": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "createDefaultWorkContract": {
        "type": "boolean",
        "required": false
      },
      "notificationSettings": {
        "type": "UserNotificationSettingsModel",
        "nullable": true,
        "required": false
      }
    }
  },
  "WorktypeForProjectOutputModel": {
    "type": "object",
    "properties": {
      "worktype": {
        "type": "WorkTypeOutputModel",
        "nullable": true,
        "required": false
      },
      "hourPrice": {
        "type": "MoneyOutputModel",
        "nullable": true,
        "required": false
      }
    }
  },
  "WorkTypeInputModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "name": {
        "type": "string",
        "required": true
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "isProductive": {
        "type": "boolean",
        "required": false
      },
      "isDefault": {
        "type": "boolean",
        "required": false
      },
      "salesAccount": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "hourCost": {
        "type": "MoneyInputModelWithNullableAmount",
        "nullable": true,
        "required": false
      }
    }
  },
  "VismaFinancialsCompanyModel": {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "OvertimePriceModel": {
    "type": "object",
    "required": [
      "overtime"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "overtime": {
        "type": "ModelBaseWithRequiredGuid",
        "required": true
      },
      "pricingMultiplier": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "pricelistVersionGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "projectGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "priceSource": {
        "type": "PriceSource",
        "readOnly": true,
        "required": false
      }
    }
  },
  "OvertimeModel": {
    "type": "object",
    "required": [
      "name",
      "code"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "percentage": {
        "type": "number:double",
        "format": "double",
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "code": {
        "type": "string",
        "required": true
      },
      "includeInFlextime": {
        "type": "boolean",
        "nullable": true,
        "required": false
      },
      "multipliesUnitCost": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "PhaseMemberModel": {
    "type": "object",
    "required": [
      "phaseGuid"
    ],
    "properties": {
      "phaseGuid": {
        "type": "string",
        "required": true
      },
      "user": {
        "type": "PhaseMemberUserSubModel",
        "nullable": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "readOnly": true,
        "required": false
      },
      "workHoursIncludingChildPhases": {
        "type": "number:double",
        "format": "double",
        "readOnly": true,
        "required": false
      },
      "workHours": {
        "type": "number:double",
        "format": "double",
        "readOnly": true,
        "required": false
      },
      "currentWorkcontractTitle": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "PhaseMemberUserSubModel": {
    "type": "object",
    "properties": {
      "firstName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "lastName": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "code": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "PhaseMembersFromBusinessUnitUsersModel": {
    "type": "object",
    "required": [
      "phaseGuid",
      "businessUnitGuid"
    ],
    "properties": {
      "phaseGuid": {
        "type": "string",
        "required": true
      },
      "businessUnitGuid": {
        "type": "string",
        "required": true
      }
    }
  },
  "ResourceAllocationAction": {
    "type": "string",
    "enum": [
      "None",
      "Delete",
      "Transfer"
    ],
    "description": "",
    "properties": {}
  },
  "ProjectBillingCustomerModel2": {
    "type": "object",
    "required": [
      "project",
      "billingCustomer"
    ],
    "properties": {
      "project": {
        "type": "ModelBaseWithRequiredGuid",
        "required": true
      },
      "billingCustomer": {
        "type": "BillingCustomerModel",
        "required": true
      },
      "isDefault": {
        "type": "boolean",
        "required": false
      },
      "canBeDeleted": {
        "type": "boolean",
        "readOnly": true,
        "required": false
      },
      "billingAddress": {
        "type": "BillingAddressModel",
        "nullable": true,
        "required": false
      },
      "billingContact": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "eInvoicingInfo": {
        "type": "CustomerEInvoicingModel",
        "nullable": true,
        "required": false
      },
      "deliveryAddress": {
        "type": "BillingAddressModel",
        "nullable": true,
        "required": false
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      }
    }
  },
  "ProjectTaskStatusModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "isDefault": {
        "type": "boolean",
        "required": false
      },
      "isDone": {
        "type": "boolean",
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "required": false
      }
    }
  },
  "TimeEntryModel": {
    "type": "object",
    "required": [
      "user",
      "phase",
      "timeEntryType",
      "eventDate"
    ],
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "user": {
        "type": "ModelBaseWithRequiredGuid",
        "required": true
      },
      "customer": {
        "type": "ModelWithName",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "project": {
        "type": "TimeEntryProject",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "phase": {
        "type": "ModelBaseWithRequiredGuid",
        "required": true
      },
      "timeEntryType": {
        "type": "ModelBaseWithRequiredGuid",
        "required": true
      },
      "description": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "eventDate": {
        "type": "string:date",
        "format": "date",
        "required": true
      },
      "quantity": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "startTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      },
      "endTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      }
    }
  },
  "TimeEntryProject": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "required": false
      }
    }
  },
  "TimeEntryTypeModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "identifier": {
        "type": "string",
        "nullable": true,
        "required": false
      }
    }
  },
  "TravelReimbursementStatusModel": {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "name": {
        "type": "string",
        "required": true
      },
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "sortOrder": {
        "type": "integer:int32",
        "format": "int32",
        "required": false
      },
      "isLocked": {
        "type": "boolean",
        "required": false
      },
      "isApproved": {
        "type": "boolean",
        "required": false
      },
      "isActive": {
        "type": "boolean",
        "required": false
      },
      "isDefault": {
        "type": "boolean",
        "required": false
      }
    }
  },
  "DeputyProjectOwnerOutputModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "project": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "user": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "required": false
      }
    }
  },
  "DeputyProjectOwnerInputModel": {
    "type": "object",
    "required": [
      "project",
      "user"
    ],
    "properties": {
      "project": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "user": {
        "type": "SimpleInputRequiredModel",
        "required": true
      }
    }
  },
  "ResourceAllocationOutputModel": {
    "type": "object",
    "properties": {
      "createdDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "readOnly": true,
        "required": false
      },
      "createdBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedDateTime": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "lastUpdatedBy": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "readOnly": true,
        "required": false
      },
      "startDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "endDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "derivedStartDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "derivedEndDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "allocationPercentage": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "allocationHours": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "calculatedAllocationHours": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "projectMemberGuid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "customer": {
        "type": "ModelWithName",
        "nullable": true,
        "required": false
      },
      "user": {
        "type": "UserWithFirstNameLastNameAndPhotoFileModel",
        "nullable": true,
        "required": false
      },
      "project": {
        "type": "ResourceAllocationProjectSubModel",
        "nullable": true,
        "required": false
      },
      "phase": {
        "type": "ResourceAllocationPhaseSubModel",
        "nullable": true,
        "required": false
      }
    }
  },
  "ResourceAllocationProjectSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "isInternal": {
        "type": "boolean",
        "required": false
      },
      "number": {
        "type": "integer:int64",
        "format": "int64",
        "nullable": true,
        "required": false
      }
    }
  },
  "ResourceAllocationPhaseSubModel": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "guid": {
        "type": "string",
        "nullable": true,
        "required": false
      },
      "startDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "endDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      }
    }
  },
  "ResourceAllocationCriteriaModel": {
    "type": "object",
    "properties": {
      "startDate": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      },
      "endDate": {
        "type": "string:date-time",
        "format": "date-time",
        "nullable": true,
        "required": false
      },
      "userGuids": {
        "type": "array",
        "nullable": true,
        "required": false
      },
      "userLicenseTypes": {
        "type": "array<LicenseUserType>",
        "nullable": true,
        "required": false
      },
      "phaseGuids": {
        "type": "array",
        "nullable": true,
        "required": false
      },
      "projectGuids": {
        "type": "array",
        "nullable": true,
        "required": false
      },
      "projectBusinessUnitGuids": {
        "type": "array",
        "nullable": true,
        "required": false
      },
      "userBusinessUnitGuids": {
        "type": "array",
        "nullable": true,
        "required": false
      },
      "projectManagerUserGuids": {
        "type": "array",
        "nullable": true,
        "required": false
      },
      "userTagGuids": {
        "type": "array",
        "nullable": true,
        "required": false
      },
      "includeAbsences": {
        "type": "boolean",
        "required": false
      },
      "useSalesProbability": {
        "type": "boolean",
        "required": false
      },
      "projectStatusTypeGuids": {
        "type": "array",
        "nullable": true,
        "required": false
      },
      "projectTagGuids": {
        "type": "array",
        "nullable": true,
        "required": false
      },
      "superiorUserGuids": {
        "type": "array",
        "nullable": true,
        "required": false
      },
      "salesStatusTypeGuids": {
        "type": "array",
        "nullable": true,
        "required": false
      },
      "salesProgresses": {
        "type": "array<SalesProgress>",
        "nullable": true,
        "required": false
      },
      "resourceAllocationGuids": {
        "type": "array",
        "nullable": true,
        "required": false
      }
    }
  },
  "SalesProgress": {
    "type": "string",
    "enum": [
      "None",
      "InProgress",
      "Won",
      "Lost"
    ],
    "description": "",
    "properties": {}
  },
  "ResourceAllocationInputModel": {
    "type": "object",
    "required": [
      "user",
      "project"
    ],
    "properties": {
      "startDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "endDate": {
        "type": "string:date",
        "format": "date",
        "nullable": true,
        "required": false
      },
      "allocationPercentage": {
        "type": "integer:int32",
        "format": "int32",
        "nullable": true,
        "required": false
      },
      "allocationHours": {
        "type": "number:double",
        "format": "double",
        "nullable": true,
        "required": false
      },
      "user": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "project": {
        "type": "SimpleInputRequiredModel",
        "required": true
      },
      "phase": {
        "type": "SimpleInputModel",
        "nullable": true,
        "required": false
      }
    }
  }
} as const;

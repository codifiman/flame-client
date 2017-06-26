FORMAT: 1A

# Flame API
A simple API for controlling a set of flamethrowers.

# Group General
## System Status [/status]

### Get the overall system status [GET]
+ Response 200 (application/json)
{
  "uptime": 0,
  "version": "0.3.1"
}

# Group Burner
## Locks [/burner/lock]

### Current Lock State [GET]
Get the lock state and lock holder
+ Response 200 (application/json)
{
  "state": "UNLOCKED"
}

### Arm [POST]
Request a lock on the system

+ state (string) LOCKED - Set the system state to locked
+ lockId (string) <guid> - The ID of the client requesting the lock

+ Request (application/json)
  {
    "state": "LOCKED",
    "lockId": "699660c8-13b6-43af-b7f9-095a0e2c2837"
  }

+ Schema
  {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
      "message": {
        "state": "LOCKED",
        "lockId": "string",
      }
    }
  }

+ Response 200

### Disarm [POST]
Request a release of a lock

+ state (string) UNLOCKED - Set the system state to locked
+ lockId (string) <guid> - The ID of the client requesting the lock

+ Request (application/json)
  {
    "state":  "UNLOCKED",
    "lockId": "699660c8-13b6-43af-b7f9-095a0e2c2837"
  }

+ Schema
  {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
      "message": {
        "state": "UNLOCKED",
        "lockId": "string",
      }
    }
  }

+ Response 200


# Group Channels [/burner/channels/{channelId}]
+ Parameters
  + channelId (number) - Channel to turn on or off. 0, 1, or 2

### Channel on [POST]
Turn on a flamethrower

+ state (boolean) - Set the state of the channel to "true", or "on"
+ lockId (string) - Lock ID of the user requesting the channel be turned on

+ Request (application/json)
  {
    "state": true,
    "lockId": "699660c8-13b6-43af-b7f9-095a0e2c2837"
  }

+ Schema
  {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
      "message": {
        "state": true,
        "lockId": "string",
      }
    }
  }

+ Response 200


### Channel off [POST]
Turn off a flamethrower

+ state (boolean) - Set the state of the channel to "false", or "off"
+ lockId (string) - Lock ID of the user requesting the channel be turned off

+ Request (application/json)
  {
    "state": false,
    "lockId": "699660c8-13b6-43af-b7f9-095a0e2c2837"
  }

+ Schema
  {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
      "message": {
        "state": false,
        "lockId": "string",
      }
    }
  }

+ Response 200



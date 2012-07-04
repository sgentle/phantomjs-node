vows    = require 'vows'
assert  = require 'assert'
psTree  = require 'ps-tree'
child   = require 'child_process'
phantom = require '../phantom'


describe = (name, bat) -> vows.describe(name).addBatch(bat).export(module)

# Make coffeescript not return anything
# This is needed because vows topics do different things if you have a return value
t = (fn) ->
  (args...) ->
    fn.apply this, args
    return

describe "The phantom module"
  "Can create an instance":
    topic: t -> phantom.create (p) => @callback null, p
    
    "which also has a process": (p) -> assert.isObject p.process
    
    "which, when killed":
      topic: t (p) ->
        test = this

        setTimeout ->
          p.process.kill 'SIGKILL'
          setTimeout ->
            psTree process.pid, test.callback
          , 500
        , 500

      "stops running completely": (children) ->
        assert.equal children.length, 1, "process still has #{children.length} child(ren): #{JSON.stringify children}"



      
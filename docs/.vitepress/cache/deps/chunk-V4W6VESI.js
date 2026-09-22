import {
  AbstractMermaidTokenBuilder,
  CommonValueConverter,
  EmptyFileSystem,
  EventModelingGeneratedModule,
  MermaidGeneratedSharedModule,
  __name,
  createDefaultCoreModule,
  createDefaultSharedCoreModule,
  inject
} from "./chunk-NF4SJSTG.js";

// node_modules/.pnpm/@mermaid-js+parser@2.0.0/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/chunk-6EIED4P4.mjs
var _a;
var EventModelingTokenBuilder = (_a = class extends AbstractMermaidTokenBuilder {
  constructor() {
    super(["eventmodeling"]);
  }
}, __name(_a, "EventModelingTokenBuilder"), _a);
var COMMAND_TYPES = /* @__PURE__ */ new Set(["cmd", "command"]);
var EVENT_TYPES = /* @__PURE__ */ new Set(["evt", "event"]);
var READMODEL_TYPES = /* @__PURE__ */ new Set(["rmo", "readmodel"]);
var PROCESSOR_TYPES = /* @__PURE__ */ new Set(["pcr", "processor"]);
var UI_TYPES = /* @__PURE__ */ new Set(["ui"]);
function registerValidationChecks(services) {
  const validator = services.validation.EventModelingValidator;
  const registry = services.validation.ValidationRegistry;
  if (registry) {
    const checks = {
      EmTimeFrame: validator.checkSourceFrameTypes.bind(validator),
      EmResetFrame: validator.checkSourceFrameTypes.bind(validator)
    };
    registry.register(checks, validator);
  }
}
__name(registerValidationChecks, "registerValidationChecks");
var _a2;
var EventModelingValidator = (_a2 = class {
  checkSourceFrameTypes(frame, accept) {
    if (frame.sourceFrames.length === 0) {
      return;
    }
    if (COMMAND_TYPES.has(frame.modelEntityType)) {
      this.validateSources(
        frame,
        /* @__PURE__ */ new Set([...UI_TYPES, ...PROCESSOR_TYPES]),
        "command",
        "ui or processor",
        accept
      );
    } else if (EVENT_TYPES.has(frame.modelEntityType)) {
      this.validateSources(frame, COMMAND_TYPES, "event", "command", accept);
    } else if (READMODEL_TYPES.has(frame.modelEntityType)) {
      this.validateSources(frame, EVENT_TYPES, "read model", "event", accept);
    } else if (PROCESSOR_TYPES.has(frame.modelEntityType)) {
      this.validateSources(frame, READMODEL_TYPES, "processor", "read model", accept);
    } else if (UI_TYPES.has(frame.modelEntityType)) {
      this.validateSources(frame, READMODEL_TYPES, "ui", "read model", accept);
    }
  }
  validateSources(frame, allowedSourceTypes, targetLabel, expectedSourceLabel, accept) {
    for (const sourceRef of frame.sourceFrames) {
      const source = sourceRef.ref;
      if (source !== void 0 && !allowedSourceTypes.has(source.modelEntityType)) {
        accept(
          "error",
          `A ${targetLabel} can only receive input from a ${expectedSourceLabel}, not from '${source.modelEntityType}'.`,
          { node: frame, property: "sourceFrames" }
        );
      }
    }
  }
}, __name(_a2, "EventModelingValidator"), _a2);
var EventModelingModule = {
  parser: {
    TokenBuilder: __name(() => new EventModelingTokenBuilder(), "TokenBuilder"),
    ValueConverter: __name(() => new CommonValueConverter(), "ValueConverter")
  },
  validation: {
    EventModelingValidator: __name(() => new EventModelingValidator(), "EventModelingValidator")
  }
};
function createEventModelingServices(context = EmptyFileSystem) {
  const shared = inject(
    createDefaultSharedCoreModule(context),
    MermaidGeneratedSharedModule
  );
  const EventModel = inject(
    createDefaultCoreModule({ shared }),
    EventModelingGeneratedModule,
    EventModelingModule
  );
  shared.ServiceRegistry.register(EventModel);
  registerValidationChecks(EventModel);
  return { shared, EventModel };
}
__name(createEventModelingServices, "createEventModelingServices");

export {
  EventModelingModule,
  createEventModelingServices
};
//# sourceMappingURL=chunk-V4W6VESI.js.map

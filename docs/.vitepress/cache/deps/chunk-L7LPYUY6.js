import {
  AbstractMermaidTokenBuilder,
  AbstractMermaidValueConverter,
  EmptyFileSystem,
  MermaidGeneratedSharedModule,
  RailroadGrammarGeneratedModule,
  __name,
  createDefaultCoreModule,
  createDefaultSharedCoreModule,
  inject
} from "./chunk-NF4SJSTG.js";

// node_modules/.pnpm/@mermaid-js+parser@2.0.0/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/chunk-OUJLGHUK.mjs
var _a;
var RailroadTokenBuilder = (_a = class extends AbstractMermaidTokenBuilder {
  constructor() {
    super(["railroad-beta"]);
  }
}, __name(_a, "RailroadTokenBuilder"), _a);
var decodeEscapedString = __name((input) => {
  const content = input.slice(1, -1);
  let value = "";
  for (let index = 0; index < content.length; index++) {
    const character = content[index];
    if (character === "\\" && index + 1 < content.length) {
      index++;
      const escaped = content[index];
      switch (escaped) {
        case "n":
          value += "\n";
          break;
        case "r":
          value += "\r";
          break;
        case "t":
          value += "	";
          break;
        default:
          value += escaped;
      }
      continue;
    }
    value += character;
  }
  return value;
}, "decodeEscapedString");
var _a2;
var RailroadValueConverter = (_a2 = class extends AbstractMermaidValueConverter {
  runConverter(rule, input, cstNode) {
    const value = super.runConverter(rule, input, cstNode);
    if (rule.name === "TITLE" && typeof value === "string") {
      const trimmedValue = value.trim();
      if (trimmedValue.startsWith('"') && trimmedValue.endsWith('"') || trimmedValue.startsWith("'") && trimmedValue.endsWith("'")) {
        return decodeEscapedString(trimmedValue);
      }
    }
    return value;
  }
  runCustomConverter(rule, input, _cstNode) {
    if (rule.name === "RR_STRING") {
      return decodeEscapedString(input);
    }
    return void 0;
  }
}, __name(_a2, "RailroadValueConverter"), _a2);
var RailroadModule = {
  parser: {
    TokenBuilder: __name(() => new RailroadTokenBuilder(), "TokenBuilder"),
    ValueConverter: __name(() => new RailroadValueConverter(), "ValueConverter")
  }
};
function createRailroadServices(context = EmptyFileSystem) {
  const shared = inject(
    createDefaultSharedCoreModule(context),
    MermaidGeneratedSharedModule
  );
  const Railroad = inject(
    createDefaultCoreModule({ shared }),
    RailroadGrammarGeneratedModule,
    RailroadModule
  );
  shared.ServiceRegistry.register(Railroad);
  return { shared, Railroad };
}
__name(createRailroadServices, "createRailroadServices");

export {
  RailroadModule,
  createRailroadServices
};
//# sourceMappingURL=chunk-L7LPYUY6.js.map

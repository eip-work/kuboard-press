import {
  AbstractMermaidTokenBuilder,
  AbstractMermaidValueConverter,
  EmptyFileSystem,
  MermaidGeneratedSharedModule,
  RailroadAbnfGrammarGeneratedModule,
  __name,
  createDefaultCoreModule,
  createDefaultSharedCoreModule,
  inject
} from "./chunk-NF4SJSTG.js";

// node_modules/.pnpm/@mermaid-js+parser@2.0.0/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/chunk-XHIXRSVI.mjs
var _a;
var RailroadAbnfTokenBuilder = (_a = class extends AbstractMermaidTokenBuilder {
  constructor() {
    super(["railroad-abnf-beta"]);
  }
}, __name(_a, "RailroadAbnfTokenBuilder"), _a);
var _a2;
var RailroadAbnfValueConverter = (_a2 = class extends AbstractMermaidValueConverter {
  runConverter(rule, input, cstNode) {
    const value = super.runConverter(rule, input, cstNode);
    if (rule.name === "TITLE" && typeof value === "string") {
      const trimmedValue = value.trim();
      if (trimmedValue.startsWith('"') && trimmedValue.endsWith('"') || trimmedValue.startsWith("'") && trimmedValue.endsWith("'")) {
        return trimmedValue.slice(1, -1);
      }
    }
    return value;
  }
  runCustomConverter(rule, input, _cstNode) {
    if (rule.name === "ABNF_STRING") {
      return input.slice(1, -1);
    }
    return void 0;
  }
}, __name(_a2, "RailroadAbnfValueConverter"), _a2);
var RailroadAbnfModule = {
  parser: {
    TokenBuilder: __name(() => new RailroadAbnfTokenBuilder(), "TokenBuilder"),
    ValueConverter: __name(() => new RailroadAbnfValueConverter(), "ValueConverter")
  }
};
function createRailroadAbnfServices(context = EmptyFileSystem) {
  const shared = inject(
    createDefaultSharedCoreModule(context),
    MermaidGeneratedSharedModule
  );
  const RailroadAbnf = inject(
    createDefaultCoreModule({ shared }),
    RailroadAbnfGrammarGeneratedModule,
    RailroadAbnfModule
  );
  shared.ServiceRegistry.register(RailroadAbnf);
  return { shared, RailroadAbnf };
}
__name(createRailroadAbnfServices, "createRailroadAbnfServices");

export {
  RailroadAbnfModule,
  createRailroadAbnfServices
};
//# sourceMappingURL=chunk-Y2ZOYXR2.js.map

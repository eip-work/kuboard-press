import {
  AbstractMermaidTokenBuilder,
  CommonValueConverter,
  CynefinGrammarGeneratedModule,
  EmptyFileSystem,
  MermaidGeneratedSharedModule,
  __name,
  createDefaultCoreModule,
  createDefaultSharedCoreModule,
  inject
} from "./chunk-NF4SJSTG.js";

// node_modules/.pnpm/@mermaid-js+parser@2.0.0/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/chunk-6TQVIW2G.mjs
var _a;
var CynefinTokenBuilder = (_a = class extends AbstractMermaidTokenBuilder {
  constructor() {
    super(["cynefin-beta"]);
  }
}, __name(_a, "CynefinTokenBuilder"), _a);
var CynefinModule = {
  parser: {
    TokenBuilder: __name(() => new CynefinTokenBuilder(), "TokenBuilder"),
    ValueConverter: __name(() => new CommonValueConverter(), "ValueConverter")
  }
};
function createCynefinServices(context = EmptyFileSystem) {
  const shared = inject(
    createDefaultSharedCoreModule(context),
    MermaidGeneratedSharedModule
  );
  const Cynefin = inject(
    createDefaultCoreModule({ shared }),
    CynefinGrammarGeneratedModule,
    CynefinModule
  );
  shared.ServiceRegistry.register(Cynefin);
  return { shared, Cynefin };
}
__name(createCynefinServices, "createCynefinServices");

export {
  CynefinModule,
  createCynefinServices
};
//# sourceMappingURL=chunk-FHC33HMR.js.map

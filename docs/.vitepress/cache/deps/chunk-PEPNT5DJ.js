import {
  AbstractMermaidTokenBuilder,
  CommonValueConverter,
  EmptyFileSystem,
  MermaidGeneratedSharedModule,
  RadarGrammarGeneratedModule,
  __name,
  createDefaultCoreModule,
  createDefaultSharedCoreModule,
  inject
} from "./chunk-NF4SJSTG.js";

// node_modules/.pnpm/@mermaid-js+parser@2.0.0/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/chunk-I5DQTOEV.mjs
var _a;
var RadarTokenBuilder = (_a = class extends AbstractMermaidTokenBuilder {
  constructor() {
    super(["radar-beta"]);
  }
}, __name(_a, "RadarTokenBuilder"), _a);
var RadarModule = {
  parser: {
    TokenBuilder: __name(() => new RadarTokenBuilder(), "TokenBuilder"),
    ValueConverter: __name(() => new CommonValueConverter(), "ValueConverter")
  }
};
function createRadarServices(context = EmptyFileSystem) {
  const shared = inject(
    createDefaultSharedCoreModule(context),
    MermaidGeneratedSharedModule
  );
  const Radar = inject(
    createDefaultCoreModule({ shared }),
    RadarGrammarGeneratedModule,
    RadarModule
  );
  shared.ServiceRegistry.register(Radar);
  return { shared, Radar };
}
__name(createRadarServices, "createRadarServices");

export {
  RadarModule,
  createRadarServices
};
//# sourceMappingURL=chunk-PEPNT5DJ.js.map

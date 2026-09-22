import {
  AbstractMermaidTokenBuilder,
  AbstractMermaidValueConverter,
  EmptyFileSystem,
  MermaidGeneratedSharedModule,
  TreeViewGrammarGeneratedModule,
  __name,
  createDefaultCoreModule,
  createDefaultSharedCoreModule,
  inject
} from "./chunk-NF4SJSTG.js";

// node_modules/.pnpm/@mermaid-js+parser@2.0.0/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/chunk-IH6LHLGP.mjs
var _a;
var TreeViewValueConverter = (_a = class extends AbstractMermaidValueConverter {
  runCustomConverter(rule, input, _cstNode) {
    if (rule.name === "INDENTATION") {
      return (input == null ? void 0 : input.length) || 0;
    }
    if (rule.name === "QUOTED_NAME") {
      return input.substring(1, input.length - 1);
    }
    if (rule.name === "BARE_NAME") {
      return input.replace(/[\t ]+$/, "");
    }
    if (rule.name === "CLASS_ANNOTATION") {
      const trimmed = input.trim();
      return trimmed.substring(3).trim();
    }
    if (rule.name === "ICON_ANNOTATION") {
      const trimmed = input.trim();
      return trimmed.substring(5, trimmed.length - 1);
    }
    if (rule.name === "DESC_ANNOTATION") {
      const trimmed = input.trim();
      return trimmed.substring(2).trim();
    }
    return void 0;
  }
}, __name(_a, "TreeViewValueConverter"), _a);
var _a2;
var TreeViewTokenBuilder = (_a2 = class extends AbstractMermaidTokenBuilder {
  constructor() {
    super(["treeView-beta"]);
  }
}, __name(_a2, "TreeViewTokenBuilder"), _a2);
var TreeViewModule = {
  parser: {
    TokenBuilder: __name(() => new TreeViewTokenBuilder(), "TokenBuilder"),
    ValueConverter: __name(() => new TreeViewValueConverter(), "ValueConverter")
  }
};
function createTreeViewServices(context = EmptyFileSystem) {
  const shared = inject(
    createDefaultSharedCoreModule(context),
    MermaidGeneratedSharedModule
  );
  const TreeView = inject(
    createDefaultCoreModule({ shared }),
    TreeViewGrammarGeneratedModule,
    TreeViewModule
  );
  shared.ServiceRegistry.register(TreeView);
  return { shared, TreeView };
}
__name(createTreeViewServices, "createTreeViewServices");

export {
  TreeViewModule,
  createTreeViewServices
};
//# sourceMappingURL=chunk-6GR474LH.js.map

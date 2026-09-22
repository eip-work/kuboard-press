import {
  AbstractMermaidTokenBuilder,
  AbstractMermaidValueConverter,
  EmptyFileSystem,
  MermaidGeneratedSharedModule,
  TreemapGrammarGeneratedModule,
  __name,
  createDefaultCoreModule,
  createDefaultSharedCoreModule,
  inject
} from "./chunk-NF4SJSTG.js";

// node_modules/.pnpm/@mermaid-js+parser@2.0.0/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/chunk-6K3QC6MW.mjs
var _a;
var TreemapTokenBuilder = (_a = class extends AbstractMermaidTokenBuilder {
  constructor() {
    super(["treemap"]);
  }
}, __name(_a, "TreemapTokenBuilder"), _a);
var classDefRegex = /classDef\s+([A-Z_a-z]\w+)(?:\s+([^\n\r;]*))?;?/;
var _a2;
var TreemapValueConverter = (_a2 = class extends AbstractMermaidValueConverter {
  runCustomConverter(rule, input, _cstNode) {
    if (rule.name === "NUMBER2") {
      return parseFloat(input.replace(/,/g, ""));
    } else if (rule.name === "SEPARATOR") {
      return input.substring(1, input.length - 1);
    } else if (rule.name === "STRING2") {
      return input.substring(1, input.length - 1);
    } else if (rule.name === "INDENTATION") {
      return input.length;
    } else if (rule.name === "ClassDef") {
      if (typeof input !== "string") {
        return input;
      }
      const match = classDefRegex.exec(input);
      if (match) {
        return {
          $type: "ClassDefStatement",
          className: match[1],
          styleText: match[2] || void 0
        };
      }
    }
    return void 0;
  }
}, __name(_a2, "TreemapValueConverter"), _a2);
function registerValidationChecks(services) {
  const validator = services.validation.TreemapValidator;
  const registry = services.validation.ValidationRegistry;
  if (registry) {
    const checks = {
      Treemap: validator.checkSingleRoot.bind(validator)
      // Remove unused validation for TreemapRow
    };
    registry.register(checks, validator);
  }
}
__name(registerValidationChecks, "registerValidationChecks");
var _a3;
var TreemapValidator = (_a3 = class {
  /**
   * Validates that a treemap has only one root node.
   * A root node is defined as a node that has no indentation.
   */
  checkSingleRoot(doc, accept) {
    let rootNodeIndentation;
    for (const row of doc.TreemapRows) {
      if (!row.item) {
        continue;
      }
      if (rootNodeIndentation === void 0 && // Check if this is a root node (no indentation)
      row.indent === void 0) {
        rootNodeIndentation = 0;
      } else if (row.indent === void 0) {
        accept("error", "Multiple root nodes are not allowed in a treemap.", {
          node: row,
          property: "item"
        });
      } else if (rootNodeIndentation !== void 0 && rootNodeIndentation >= parseInt(row.indent, 10)) {
        accept("error", "Multiple root nodes are not allowed in a treemap.", {
          node: row,
          property: "item"
        });
      }
    }
  }
}, __name(_a3, "TreemapValidator"), _a3);
var TreemapModule = {
  parser: {
    TokenBuilder: __name(() => new TreemapTokenBuilder(), "TokenBuilder"),
    ValueConverter: __name(() => new TreemapValueConverter(), "ValueConverter")
  },
  validation: {
    TreemapValidator: __name(() => new TreemapValidator(), "TreemapValidator")
  }
};
function createTreemapServices(context = EmptyFileSystem) {
  const shared = inject(
    createDefaultSharedCoreModule(context),
    MermaidGeneratedSharedModule
  );
  const Treemap = inject(
    createDefaultCoreModule({ shared }),
    TreemapGrammarGeneratedModule,
    TreemapModule
  );
  shared.ServiceRegistry.register(Treemap);
  registerValidationChecks(Treemap);
  return { shared, Treemap };
}
__name(createTreemapServices, "createTreemapServices");

export {
  TreemapModule,
  createTreemapServices
};
//# sourceMappingURL=chunk-WLIKZ6MH.js.map

<script>
	export let content;
	$: content = `<div>${content}</div>
<style>
    code[class*='language-'],
    pre[class*='language-'] {
    color: #e3eaf2 !important;
    background: none;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
    border-radius: 12px;
    }

    pre[class*='language-']::-moz-selection,
    pre[class*='language-'] ::-moz-selection,
    code[class*='language-']::-moz-selection,
    code[class*='language-'] ::-moz-selection {
    background: #3c526d !important;
    }

    pre[class*='language-']::selection,
    pre[class*='language-'] ::selection,
    code[class*='language-']::selection,
    code[class*='language-'] ::selection {
    background: #3c526d !important;
    }

    /* Code blocks */
    pre[class*='language-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    }

    :not(pre) > code[class*='language-'],
    pre[class*='language-'] {
    background: #111b27 !important;
    }

    /* Inline code */
    :not(pre) > code[class*='language-'] {
    padding: 0.1em 0.3em;
    border-radius: 0.3em;
    white-space: normal;
    }

    .code-line {
    color: #e3eaf2 !important;
    }

    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
    color: #8da1b9 !important;
    }

    .token.punctuation {
    color: #e3eaf2 !important;
    }

    .token.delimiter.important,
    .token.selector .parent,
    .token.tag,
    .token.tag .token.punctuation {
    color: #66cccc !important;
    }

    .token.attr-name,
    .token.boolean,
    .token.boolean.important,
    .token.number,
    .token.constant,
    .token.selector .token.attribute {
    color: #e6d37a !important;
    }

    .token.class-name,
    .token.key,
    .token.parameter,
    .token.property,
    .token.property-access,
    .token.variable {
    color: #6cb8e6 !important;
    }

    .token.attr-value,
    .token.inserted,
    .token.color,
    .token.selector .token.value,
    .token.string,
    .token.string .token.url-link {
    color: #91d076 !important;
    }

    .token.builtin,
    .token.keyword-array,
    .token.package,
    .token.regex {
    color: #f4adf4 !important;
    }

    .token.function,
    .token.selector .token.class,
    .token.selector .token.id,
    .token.maybe-class-name {
    color: #c699e3 !important;
    }

    .token.atrule .token.rule,
    .token.combinator,
    .token.keyword,
    .token.operator,
    .token.pseudo-class,
    .token.pseudo-element,
    .token.selector,
    .token.unit {
    color: #e9ae7e !important;
    }

    .token.deleted,
    .token.important {
    color: #cd6660 !important;
    }

    .token.keyword-this,
    .token.this {
    color: #6cb8e6 !important;
    }

    .token.important,
    .token.keyword-this,
    .token.this,
    .token.bold {
    font-weight: bold;
    }

    .token.delimiter.important {
    font-weight: inherit;
    }

    .token.italic {
    font-style: italic;
    }

    .token.entity {
    cursor: help;
    }

    .language-markdown .token.title,
    .language-markdown .token.title .token.punctuation {
    color: #6cb8e6 !important;
    font-weight: bold;
    }

    .language-markdown .token.blockquote.punctuation {
    color: #f4adf4 !important;
    }

    .language-markdown .token.code {
    color: #66cccc !important;
    }

    .language-markdown .token.hr.punctuation {
    color: #6cb8e6 !important;
    }

    .language-markdown .token.url .token.content {
    color: #91d076 !important;
    }

    .language-markdown .token.url-link {
    color: #e6d37a !important;
    }

    .language-markdown .token.list.punctuation {
    color: #f4adf4 !important;
    }

    .language-markdown .token.table-header {
    color: #e3eaf2 !important;
    }

    .language-json .token.operator {
    color: #e3eaf2;
    }

    .language-scss .token.variable {
    color: #66cccc !important;
    }

    .token.token.tab:not(:empty):before,
    .token.token.cr:before,
    .token.token.lf:before,
    .token.token.space:before {
    color: #8da1b9 !important;
    }

    /* overrides color-values for the Toolbar plugin
       * https://prismjs.com/plugins/toolbar/
       */
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > a,
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > button {
    color: #111b27 !important;
    background: #6cb8e6 !important;
    }

    div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover,
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus,
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover,
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus {
    color: #111b27 !important;
    background: #6cb8e6da !important;
    text-decoration: none;
    }

    div.code-toolbar > .toolbar.toolbar > .toolbar-item > span,
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover,
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus {
    color: #111b27 !important;
    background: #8da1b9 !important;
    }

    .line-highlight.line-highlight {
    background: #3c526d5f !important;
    background: linear-gradient(to right, #3c526d5f 70%, #3c526d55) !important;
    }

    .line-highlight.line-highlight:before,
    .line-highlight.line-highlight[data-end]:after {
    background-color: #8da1b9 !important;
    color: #111b27 !important;
    box-shadow: 0 1px #3c526d !important;
    }

    pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before {
    background-color: #8da1b918 !important;
    }

    .line-numbers.line-numbers .line-numbers-rows {
    border-right: 1px solid #0b121b !important;
    background: #0b121b7a !important;
    }

    .line-numbers .line-numbers-rows > span:before {
    color: #8da1b9da !important;
    }

    .rainbow-braces .token.token.punctuation.brace-level-1,
    .rainbow-braces .token.token.punctuation.brace-level-5,
    .rainbow-braces .token.token.punctuation.brace-level-9 {
    color: #e6d37a !important;
    }

    .rainbow-braces .token.token.punctuation.brace-level-2,
    .rainbow-braces .token.token.punctuation.brace-level-6,
    .rainbow-braces .token.token.punctuation.brace-level-10 {
    color: #f4adf4;
    }

    .rainbow-braces .token.token.punctuation.brace-level-3,
    .rainbow-braces .token.token.punctuation.brace-level-7,
    .rainbow-braces .token.token.punctuation.brace-level-11 {
    color: #6cb8e6 !important;
    }

    .rainbow-braces .token.token.punctuation.brace-level-4,
    .rainbow-braces .token.token.punctuation.brace-level-8,
    .rainbow-braces .token.token.punctuation.brace-level-12 {
    color: #c699e3 !important;
    }

    pre.diff-highlight > code .token.token.deleted:not(.prefix),
    pre > code.diff-highlight .token.token.deleted:not(.prefix) {
    background-color: #cd66601f !important;
    }

    pre.diff-highlight > code .token.token.inserted:not(.prefix),
    pre > code.diff-highlight .token.token.inserted:not(.prefix) {
    background-color: #91d0761f !important;
    }

    .command-line .command-line-prompt {
    border-right: 1px solid #0b121b !important;
    }

    .command-line .command-line-prompt > span:before {
    color: #8da1b9da !important;
    }

    .content-link{
    color: var(--primary-color);
    }
</style>`;
</script>

{@html content}

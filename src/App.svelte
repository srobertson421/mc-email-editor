<script>
  import CodeMirror from 'codemirror';
  import 'codemirror/mode/xml/xml.js';
  import { onMount } from 'svelte';
  import createComponents from './createComponents';

  let activeTab = 0;

  let codeEl;
  let codeMirror;
  let codeText = '';
  let templateData = {
    components: [],
    renderList: []
  }

  onMount(() => {
    codeMirror = CodeMirror(codeEl, {
      mode: {
        name: "xml",
        htmlMode: true
      },
      value: codeText,
      theme: 'base16-dark'
    });

    codeMirror.on('change', (cm) => {
      codeText = cm.doc.getValue();
    });
  });

  $: {
    const comps = createComponents(codeText);
    templateData.components = comps;
    if(templateData.components.length > 0) {
      templateData.renderList = [];
      templateData.renderList.push(templateData.components[0].content.cloneNode(true));
    }
  };
</script>

<!-- 
  <div mc:repeatable="section">
    <h1>Section 1</h1>
  </div>
  <div mc:repeatable="section">
    <h1>Section 2</h1>
  </div>
 -->

<main id="main-container">
  <nav id="tab-nav">
    <div on:click={() => activeTab = 0} class="nav-tab" class:active={activeTab === 0}>HTML Render</div>
    <div on:click={() => activeTab = 1} class="nav-tab" class:active={activeTab === 1}>Code</div>
    <div on:click={() => activeTab = 2} class="nav-tab" class:active={activeTab === 2}>MC Render</div>
  </nav>
  <section id="preview-section" class="section" class:hidden={activeTab === 1 || activeTab === 2}>
    {@html codeText}
  </section>
  <section bind:this={codeEl} id="code-section" class="section" class:hidden={activeTab === 0 || activeTab === 2}>
  </section>
  <section id="render-section" class="section" class:hidden={activeTab === 0 || activeTab === 1}>
    {#each templateData.renderList as comp}
      {@html comp.firstElementChild.outerHTML}
    {/each}
  </section>
</main>

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(html,body) {
    margin: 0;
    padding: 0;
    width: 100%;
  }

  #main-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    /* max-width: 1280px; */
    margin: 0 auto;
  }

  #tab-nav {
    display: flex;
    width: 100%;
    flex-direction: row;
  }

  #tab-nav .nav-tab {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
    cursor: pointer;
    text-align: center;
  }

  #tab-nav .nav-tab.active {
    background-color: lightseagreen;
    color: white;
  }

  #preview-section {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }

  #code-section {
    width: 100%;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 48px);
  }

  .section {
    display: flex;
  }

  .section.hidden {
    display: none;
  }
</style>

using Microsoft.JSInterop;
using System;
using System.Threading.Tasks;

namespace FastRazorComponentTheme
{
    // This class provides an example of how JavaScript functionality can be wrapped in a .NET class for easy
    // consumption. The associated JavaScript module is loaded on demand when first needed.
    //
    // This class can be registered as scoped DI service and then injected into Blazor components for use.

    public class ExampleJsInterop : IAsyncDisposable
    {
        public ExampleJsInterop(IJSRuntime jsRuntime)
        {
            moduleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
               "import", "./_content/FastRazorComponentTheme/exampleJsInterop.js").AsTask());
        }

        public async ValueTask DisposeAsync()
        {
            if (moduleTask.IsValueCreated)
            {
                var module = await moduleTask.Value;
                await module.DisposeAsync();
            }
        }

        /// <summary>
        /// Initializes the design system provider.
        /// </summary>
        /// <param name="layerLuminance"><see cref="Styling.LayerLuminance"/> to use for styling.</param>
        /// <returns></returns>
        public async ValueTask InitDesignSystemProviderAsync()
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("initDesignSystemProvider");
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public async ValueTask SetColorLayerLuminanceAsync(string layerLuminance)
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("setColorLayerLuminance", layerLuminance);
        }

        private readonly Lazy<Task<IJSObjectReference>> moduleTask;
    }
}

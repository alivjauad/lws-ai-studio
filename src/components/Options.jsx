import { memo, useEffect, useState } from "react";
import { ratioPresets } from "../data";
import useAppContext from "../hooks/useAppContext";
import { capitalizeFirst } from "../utils";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Select from "./ui/Select";

const Options = memo(() => {
  //* Local States
  const [loadingModels, setLoadingModels] = useState(false);
  const [inputErrors, setInputErrors] = useState({});
  const [modelFetchError, setModelFetchError] = useState("");
  const [model, setModel] = useState([]);

  // *Hooks
  const { settings, setSettings, setSearchError } = useAppContext();

  // *Handlers

  // Handle selection for model, width, height
  const handlePresetSelection = (e) => {
    // Clear Search error on Model Change
    e.target.name == "model" && setSearchError("");

    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: name === "width" || name === "height" ? Number(value) : value,
    }));

    // Validation for width and height
    if ((name === "width" || name === "height") && Number(value) < 256) {
      setInputErrors((prev) => ({
        ...prev,
        [name]: "Value must be a number and at least 256px",
      }));
    } else {
      setInputErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Handle ratio buttons click
  const handleRatioChange = (preset) => {
    // Update States
    setSettings((prev) => ({
      ...prev,
      width: Number(preset.width),
      height: Number(preset.height),
    }));

    // Clear width and height errors if preset values are valid
    setInputErrors((prev) => ({
      ...prev,
      width: null,
      height: null,
    }));
  };

  // *Effects

  useEffect(() => {
    let isMounted = true;
    const fetchModels = async () => {
      try {
        setLoadingModels(true);
        const response = await fetch("https://image.pollinations.ai/models");
        // Handle Error
        if (!response.ok)
          throw new Error("No Model Found. Please reload the page.");

        // Fetch Data
        const data = await response.json();
        const aiModels = data.map((model) => ({
          id: crypto.randomUUID(),
          name: capitalizeFirst(model),
          value: model,
        }));
        // Set States
        if (isMounted) {
          setModel(aiModels);
          setSettings((prev) => ({
            ...prev,
            model: aiModels[0]?.value || "",
          }));
        }
      } catch (error) {
        setModelFetchError(error.message);
      } finally {
        if (isMounted) setLoadingModels(false);
      }
    };
    fetchModels();

    // Clean Up
    return () => {
      isMounted = false;
      setModelFetchError("");
    };
  }, [setLoadingModels, setModel, setSettings]);

  return (
    <div className="border border-zinc-700/70 mb-6 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium">Advanced Settings</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Model */}
        <div>
          <Select
            value={settings.value}
            items={model}
            variant={"secondary"}
            label={"Model"}
            name="model"
            labelProps={{ htmlFor: "model" }}
            onSortChange={handlePresetSelection}
            fullWidth={true}
            isLoading={loadingModels}
            modelFetchError={modelFetchError}
          />
        </div>
        {/* Seed */}
        <div>
          <Input
            type="number"
            placeholder="Random"
            disabled
            label="Seed"
            labelProps={{ htmlFor: "seed" }}
            variant="secondary"
            fullWidth={true}
            inputError={inputErrors.seed}
          />
        </div>
        {/* Width */}
        <div>
          <Input
            type="number"
            placeholder="Width"
            label="Width"
            name="width"
            labelProps={{ htmlFor: "width" }}
            fullWidth={true}
            value={settings.width || ""}
            variant="secondary"
            onInput={handlePresetSelection}
            inputError={inputErrors.width}
          />
        </div>
        {/* Height */}
        <div>
          <Input
            type="number"
            placeholder="Height"
            label="Height"
            name="height"
            labelProps={{ htmlFor: "height" }}
            fullWidth={true}
            value={settings.height || ""}
            variant="secondary"
            onInput={handlePresetSelection}
            inputError={inputErrors.height}
          />
        </div>
        {/* Aspect Ratio Presets */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">
            Aspect Ratio Presets
          </label>
          <div className="flex flex-wrap gap-2">
            {ratioPresets.map((item) => {
              return (
                <Button
                  key={item.id}
                  item={item}
                  variant={"presets"}
                  onButtonClick={() => handleRatioChange(item)}
                >
                  {item.name}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Options;

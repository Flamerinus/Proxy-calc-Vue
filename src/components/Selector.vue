<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { computed, ref, watch } from 'vue'

import Button from './ui/button/Button.vue';
import { Badge } from '@/components/ui/badge';

const props = defineProps<{
  resolvalues: any;
}>();

const resolutionsWithResValue: { resolution: string; resvalue: string }[] = [];

for (const resolutionName in props.resolvalues.data.Resolutions) {
  const resolution = props.resolvalues.data.Resolutions[resolutionName];
  resolutionsWithResValue.push({
    resolution: resolutionName,
    resvalue: resolution.Res
  });
}
const durations: { [key: string]: number } = {
  '1 minute': 60,
  '10 minutes': 600,
  '30 minutes': 1800,
  '1 hour': 3600,
  '3 hours': 10800,
  '10 hours': 36000,
};

const selectedResolution = ref("")
const selectedCodec = ref()
const codecOptions = ref()
const selectedFps = ref("")
const fpsOptions = ref()
const selectedDuration = ref("")
const bitRate = ref()
const bitDepth = ref("")
const chroma = ref("")
const fileSize = ref()

watch(selectedResolution, () => {
  const codecs = props.resolvalues.data.Resolutions[selectedResolution.value].Codec;
  codecOptions.value = Object.keys(codecs);

  if (!codecOptions.value.includes(selectedCodec.value)) {
    selectedCodec.value = "";
    selectedFps.value = "";
  }

  if (selectedCodec.value) {
    const fps = props.resolvalues.data.Resolutions[selectedResolution.value].Codec[selectedCodec.value];
    fpsOptions.value = Object.keys(fps);
    if (!fpsOptions.value.includes(selectedFps.value)) {
      selectedFps.value = "";
    }
  }
  calculate();
});

watch(selectedCodec, () => {
  if (selectedCodec.value) {
    const fps = props.resolvalues.data.Resolutions[selectedResolution.value].Codec[selectedCodec.value];
    fpsOptions.value = Object.keys(fps);
    if (!fpsOptions.value.includes(selectedFps.value)) {
      selectedFps.value = "";
    }
  }
  calculate();
});

function calculate() {
  if (selectedFps.value) {
    const finalpath = props.resolvalues.data.Resolutions[selectedResolution.value].Codec[selectedCodec.value][selectedFps.value]

    bitRate.value = finalpath.Data
    bitDepth.value = finalpath.Bits
    chroma.value = finalpath.Chroma

    if (selectedDuration) {
      const selectedDurationValue = selectedDuration.value; // Access the value
      fileSize.value = bitRate.value * durations[selectedDurationValue]

    }

  }
}

watch([selectedFps, selectedDuration], () => {
  calculate();
});

const formattedFileSize = computed(() => {
  if (fileSize.value > 999 && fileSize.value < 999999) {
    const sizeInGB = (fileSize.value / 1024).toFixed(2);
    return sizeInGB + " GB";
  } else if (fileSize.value > 999999) {
    const sizeInTB = (fileSize.value / (1024 * 1024)).toFixed(2);
    return sizeInTB + " TB";
  } else {
    return fileSize.value.toFixed(2) + " MB";
  }

});

function copytext() {
  const infoText = document.getElementById("info")?.innerText || "Select all the options and info text will show"
  navigator.clipboard.writeText(infoText);
}

</script>
<template>
  <div class="mx-auto my-2">
    <Select name="resolution-selector" v-model="selectedResolution">
      <Label for="resolution">Resolution</Label>
      <SelectTrigger>
        <SelectValue placeholder="Please select resolution" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem v-for="resolution in resolutionsWithResValue" :value="resolution.resolution">
            {{ resolution.resolution }} {{ resolution.resvalue }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>

  <div class="mx-auto my-2">
    <Select v-if="selectedResolution" name="codec-selector" v-model="selectedCodec">
      <Label for="codec">Codec</Label>
      <SelectTrigger>
        <SelectValue placeholder="Please select codec" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>

          <SelectItem v-for="codecName in codecOptions" :key="codecName" :value="codecName">
            {{ codecName }}
          </SelectItem>

        </SelectGroup>
      </SelectContent>
    </Select>
  </div>

  <div class="mx-auto my-2">
    <Select v-if="selectedCodec" name="fps-selector" v-model="selectedFps">
      <Label for="framerate">Frame rate</Label>
      <SelectTrigger>
        <SelectValue placeholder="Please select frame rate" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem v-for="fps in fpsOptions" :key="fps" :value="fps">
            {{ fps }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
  
  <div v-if="selectedFps" class="my-2 flex justify-around gap-2">
    <Badge class=" flex-none text-center"  variant="secondary">Bitrate: {{ bitRate }} MB/s</Badge>
    <Badge class=" flex-none text-center" variant="secondary">Color depth: {{ bitDepth }} bits</Badge>
  </div>

  <div v-if="selectedFps" class="my-2 flex justify-around gap-2">
    <Badge class=" flex-none" variant="secondary">Chroma subsampling: {{ chroma }} </Badge>
  </div>

  <div class="mx-auto my-2">
    <Select v-if="selectedFps" name="time-selector" v-model="selectedDuration">
      <Label for="duration">Duration</Label>
      <SelectTrigger>
        <SelectValue placeholder="Please select clip duration" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem v-for="(value, label) in durations" :value="String(label)">
            {{ label }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>

  <div class="my-2 flex justify-around">
    <Badge v-if="selectedDuration && selectedFps" class="flex-none" variant="secondary">File size: {{ formattedFileSize
      }}</Badge>
  </div>

  <div v-if="selectedDuration && selectedFps" class="grid w-full">
    <Label for="description">Info</Label>
    <Alert>
      <AlertDescription>
        <span id="info">
          {{ selectedDuration }} of video footage in {{ selectedResolution }} -> {{ resolutionsWithResValue.find(item =>
            item.resolution === selectedResolution)?.resvalue }} resolution, encoded with
          the {{ selectedCodec }} codec at {{ selectedFps }} FPS, will take up approximately {{ formattedFileSize }} of
          disk space, will have a bit rate of {{ bitRate }} MB/s, a color depth of {{ bitDepth }} bits and a {{ chroma }} chroma subsampling.
        </span>
      </AlertDescription>
    </Alert>
    <Button @click="copytext" class="my-1" variant="outline">Copy text</Button>
  </div>

</template>

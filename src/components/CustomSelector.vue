<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Label } from '@/components/ui/label'
import { computed, ref, watch } from 'vue'
import { Badge } from '@/components/ui/badge';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'

import { SquareCheck } from 'lucide-vue-next';



const { toast } = useToast()

const durations: { [key: string]: number } = {
    '1 minute': 60,
    '10 minutes': 600,
    '30 minutes': 1800,
    '1 hour': 3600,
    '3 hours': 10800,
    '10 hours': 36000,
};

interface mega {
    value: number
}

const selectedDuration = ref("")
const bitRate = ref()
const fileSize = ref(0)
const mega = ref()
const realbr = ref()
const unit = ref("MB")

function copyText() {
    const copytxt = document.getElementById("copyText");
    const checkbtn = document.getElementById("checkspan");
    const copybtn = document.getElementById("copyspan");
    const infoText = document.getElementById("info")?.innerText || "Select all the options and info text will show";
    navigator.clipboard.writeText(infoText);
    toast({
        description: 'Text copied to clipboard',
        duration: 1500,
    });
    copytxt?.classList.add("hidden");
    checkbtn?.classList.remove("hidden");
    copybtn?.setAttribute("disabled", "disabled");

    setTimeout(() => {
        copytxt?.classList.remove("hidden");
        checkbtn?.classList.add("hidden");
        copybtn?.removeAttribute("disabled");
    }, 1500)

}

function calculate() {
    if (bitRate.value <= 99999 && bitRate.value > 0 || bitRate.value == 0) {

        if (mega.value) {
            realbr.value = parseFloat((bitRate.value / mega.value).toFixed(2));

            if (selectedDuration) {
                const selectedDurationValue = selectedDuration.value; // Access the value
                fileSize.value = realbr.value * durations[selectedDurationValue]
            }
        }
        if (mega.value == 1) {
            unit.value = "MB"
        } else {
            unit.value = "Mb"
        }
    } else if (bitRate.value > 99999) {
        bitRate.value = 99999;
    } else if (bitRate.value < 0) {
        bitRate.value = 0;
    }
}

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
watch([mega, bitRate, selectedDuration], calculate);

</script>

<template>
    <Toaster />

    <div class="mx-auto my-1">
        <Label for="bitrate">Bitrate</Label>
        <Input type="number" placeholder="Please write your bitrate (1-99999)" min="1" max="99999"
            v-model="bitRate" />
    </div>
    <div class="mx-auto my-1">
        <Label for="unit">Unit</Label>
        <ToggleGroup type="single" class="flex justify-between" v-model="mega">
            <ToggleGroupItem value="1" aria-label="Megabytes/s" class="w-full text-lg">
                Megabytes/s
            </ToggleGroupItem>
            <ToggleGroupItem value="8" aria-label="Megabits/s" class="w-full text-lg">
                Megabits/s
            </ToggleGroupItem>
        </ToggleGroup>
    </div>
    <div class="mx-auto my-1">
        <Select name="time-selector" v-model="selectedDuration">
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
        <TooltipProvider v-if="selectedDuration && bitRate && mega">
            <Tooltip>
                <TooltipTrigger class="flex flex-auto justify-center">
                    <Badge class="flex-1 justify-center" variant="secondary">File size: {{
                        formattedFileSize
                    }}</Badge>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Size of the generated file on disk.</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <Skeleton v-else class="flex-auto h-[22px] rounded-full" />
    </div>
    <div class="grid w-full">
        <Label for="description">Info</Label>
        <Alert v-if="selectedDuration && bitRate && mega">
            <AlertDescription>
                <span id="info">
                    {{ selectedDuration }} of video footage encoded with a bit rate of {{
                        bitRate }} {{ unit }}/s will take up approximately {{ formattedFileSize }} of
                    disk space. (flamerinus.github.io/Proxycalc)
                </span>
            </AlertDescription>
        </Alert>
        <Skeleton v-else class="h-16 my-1" />
        <Button id="copyspan" v-if="selectedDuration && bitRate && mega" @click="copyText" class="my-1"
            variant="secondary"><span id="copyText" class="block">Copy text</span>
            <SquareCheck id="checkspan" stroke-width="1.5" class="hidden" />
        </Button>
        <Skeleton v-else class="h-10 my-1" />
    </div>
</template>
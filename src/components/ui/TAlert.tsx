import React from "react";
import { Modal, TouchableOpacity } from "react-native";
import TText from "./TText";
import TView from "./TView";
type TProps = {
    visible: boolean;
    label: string;
    message: string;
    onClose?: () => void;
    onCancel?: () => void;
};
export default function TAlert({
    label,
    message,
    visible,
    onCancel,
    onClose,
}: TProps) {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <TView className=" bg-gray-300/90 w-80 mx-auto my-auto p-3 rounded-lg ">
                <TText className="text-center text-base font-bold">
                    {label}
                </TText>
                <TView className="p-2">
                    <TText>{message}</TText>
                </TView>

                <TView className=" flex-row items-center justify-between">
                    <TouchableOpacity className="">
                        <TText>Cancel</TText>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <TText>OK</TText>
                    </TouchableOpacity>
                </TView>
            </TView>
        </Modal>
    );
}

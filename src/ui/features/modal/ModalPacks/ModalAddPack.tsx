import React, {ChangeEvent, FC, useState} from 'react';
import {Modal} from "../Modal";
import Button from "@mui/material/Button";
import {BtnsBlock, Label, StyledInput, Title} from "../Modal.style";
import {useAppSelector} from "../../../../hooks/ReduxHooks";
import {selectStatus} from "../../../../selectors/AppSelectors";
import {ModalSuccess} from "../ModalErrorAndSuccess/ModalSuccess";

type ModalAddCardPropsType = {
    addPack: (title: string) => void
}
export const ModalAddPack: FC<ModalAddCardPropsType> =
    ({addPack}) => {

        const status = useAppSelector(selectStatus)
        const [isOpen, setIsOpen] = useState<boolean>(status === 'succedded')

        const close = () => {
            setTimeout(()=>{
                setIsOpen(false)
            }, 5000)
        }

        const [isModal, setIsModal] = useState<boolean>(false)
        const [title, setTitle] = useState<string>('')

        const openModal = () => setIsModal(true)
        const closeModal = () => setIsModal(false)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
        }
        const addNewPack = () => {
            addPack(title)
            setIsModal(false)
        }

        return (
            <>
                <Button color={"success"} variant="contained" size={"medium"}
                        onClick={openModal}>
                    Add Pack
                </Button>
                <Modal
                    isModal={isModal}
                >
                    <Title>Add new pack</Title>
                    <Label htmlFor="name">Name pack</Label>
                    <StyledInput
                        autoFocus
                        type={"text"}
                        value={title}
                        onChange={onChangeHandler}
                    />
                    <BtnsBlock>
                        <Button color={"primary"} variant="outlined" size={"medium"}
                                onClick={closeModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            color={"primary"} variant="contained" size={"medium"}
                            onClick={addNewPack}
                        >
                            Save
                        </Button>
                    </BtnsBlock>
                </Modal>
            </>
        );
    };
import {Router} from 'express';
import GuestMessageController from './controller/guest_message.controller';

const router = Router()

// router.get('/create', GuestMessageController.GetAllReceptionMessage)
router.post('/create/:guest_unique_id', GuestMessageController.createMessageByGuest)
router.get('/get-reception-messages/:wedding_unique_id', GuestMessageController.getAllReceptionMessages)
router.delete('/delete-message/:id', GuestMessageController.deleteOneMessage)

export default (app: Router) => {
    app.use('/messages', router)
}
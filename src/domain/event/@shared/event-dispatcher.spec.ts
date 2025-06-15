import Product from "../../entity/product";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain Events Tests", () => {
    it("should register an event handler", () => {
        
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]            
        ).toBeDefined();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length)
            .toBe(1);
        
            expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0])
            .toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0])
            .toMatchObject(eventHandler);
        
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]            
        ).toBeDefined();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length)
            .toBe(0);
    });

    it("should unregister all event handlers", () => {
        
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const eventHandler2 = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("ProductCreatedEvent2", eventHandler2);
        
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0])
            .toMatchObject(eventHandler);
        
        eventDispatcher.unregisterAll();

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]            
        ).toBeUndefined();
    });

    it("should notify all event handlers", () => {
        
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        
        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]            
        ).toBeDefined();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length)
            .toBe(1);
        
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0])
            .toMatchObject(eventHandler);

        const oroductCreatedEvent = new ProductCreatedEvent(
            new Product("1", "Product 1", 100)
        );

        //Quando o evento é notificado, o handler deve ser chamado
        eventDispatcher.notify(oroductCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler).toHaveBeenCalledWith(oroductCreatedEvent);
    }); 
});
